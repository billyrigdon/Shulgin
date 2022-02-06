package main

import (
	Auth "shulgin/Auth"
	Controllers "shulgin/Controllers"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()

	//Serve frontend React app
	router.Use(static.Serve("/", static.LocalFile("./dist",true)))
	
	//Serve public login/signup routes
	api:= router.Group("/api") 
	{
		public := api.Group("/public")
		{
			public.POST("login", Controllers.UserLogin)
			public.POST("signup", Controllers.UserSignup)
		}

		protected := api.Group("/protected").Use(Auth.Auth())
		{
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

func main() {	
	//Start server
	router := setupRouter()
	router.Run(":8080")
}

