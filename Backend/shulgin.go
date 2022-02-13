package main

import (
	"io"
	"os"

	Auth "shulgin/Auth"
	Controllers "shulgin/Controllers"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func setupRouter() (*gin.Engine) {
	//Configure logging
	gin.DisableConsoleColor()
	logFile := OpenLogFile("shulgin.log")
	gin.DefaultWriter = io.MultiWriter(logFile)

	//Create router
	router := gin.Default()

	//Setup Cors
	router.Use(cors.Default())

	//Serve frontend
	router.Use(static.Serve("/", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/splash", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/login", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/signup", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/stories", static.LocalFile("./dist",true)))

	//Serve public login/signup routes
	api:= router.Group("/api") 
	{
		public := api.Group("/public")
		{
			public.POST("login", Controllers.UserLogin)
			public.POST("signup", Controllers.UserSignup)
		}

		//Serve routes that require valid jwt token
		protected := api.Group("/protected").Use(Auth.Auth())
		{
			//Serve CRUD user profile routes
			protected.GET("/user",Controllers.GetUserProfile)
			protected.POST("/user/create",Controllers.CreateUserProfile)
			
			// Serve CRUD story routes
			protected.GET("/story/user", Controllers.GetUserStories)
			protected.GET("/story", Controllers.GetSingleStory)
			protected.POST("/story/create", Controllers.CreateStory)
			protected.DELETE("/story/delete",Controllers.DeleteStory)

			//Serve CRUD drug routes
			protected.GET("/drug",Controllers.GetDrug)
			protected.POST("/drug/create",Controllers.AddDrug)

			//Serve CRUD user_drug routes
			protected.GET("/user/drugs/get",Controllers.GetUserDrugs)
			protected.POST("/user/drugs/add",Controllers.AddUserDrug)
			protected.DELETE("/user/drugs/remove",Controllers.RemoveUserDrug)
		}
		
			
	}

	return router
}

//Create log file if it doesn't exist, append if it does. 
//The 666 is file permissions, not some hidden satanic message in my code.
func OpenLogFile(file string) *os.File {
	logFile, err := os.OpenFile(file, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
    if err != nil {
        log.Fatal(err)
    }
	return logFile
}

func main() {
	//Set logrus to use log file 
	logFile := OpenLogFile("shulgin.log")	
	log.SetOutput(logFile)

	//Create server
	router := setupRouter()
	

	//Start server
	router.Run(":8080")
}

