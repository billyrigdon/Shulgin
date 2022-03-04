package main

import (
	"io"
	"os"

	Auth "shulgin/Auth"
	Controllers "shulgin/Controllers"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	//"github.com/gin-gonic/autotls"
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
	//router.Use(cors.Default())

	//Serve frontend
	router.Use(static.Serve("/", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/splash", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/login", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/signup", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/stories", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/createProfile", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/home", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/addDrug", static.LocalFile("./dist",true)))
	router.Use(static.Serve("/addStory", static.LocalFile("./dist", true)))
	router.Use(static.Serve("/explore", static.LocalFile("./dist", true)))

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
			protected.GET("/story/get",Controllers.GetAllStories)
			protected.POST("/story/create", Controllers.CreateStory)
			protected.DELETE("/story/delete",Controllers.DeleteStory)
			protected.POST("/story/vote/add", Controllers.AddStoryVote)
			protected.POST("/story/vote/remove", Controllers.RemoveCommentVote)
			protected.POST("/story/comment/vote/add", Controllers.AddCommentVote)
			protected.POST("/story/comment/vote/remove", Controllers.RemoveCommentVote)
			
			
			

			//Serve CRUD drug routes
			protected.GET("/drug",Controllers.GetAllDrugs)
			protected.POST("/drug/create",Controllers.AddDrug)
			protected.GET("/drug/get",Controllers.GetDrug)	

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
	

	//Start dev server
	router.Run(":8080")

	//Start production server
	// log.Fatal(autotls.Run(router,"shulgin.io"))
}

