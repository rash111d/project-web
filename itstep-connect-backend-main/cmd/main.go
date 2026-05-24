package main

import (
	"itstep-connect/internal/database"
	"itstep-connect/internal/handlers"
	"itstep-connect/internal/middleware"
	"itstep-connect/internal/models"

	"github.com/gin-gonic/gin"
)

func main() {

	database.ConnectDB()

	database.DB.AutoMigrate(
		&models.User{},
		&models.Post{},
		&models.Comment{},
	)

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.File("../frontend/index.html")
	})

	r.StaticFile("/styles.css", "../frontend/styles.css")

	r.Static("/src", "../frontend/src")

	r.POST("/register", handlers.Register)

	r.POST("/login", handlers.Login)

	api := r.Group("/api")

	api.Use(middleware.AuthMiddleware())

	api.GET("/profile", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Protected profile route",
		})
	})

	api.POST("/posts", handlers.CreatePost)

	api.GET("/posts", handlers.GetPosts)

	api.DELETE("/posts/:id", handlers.DeletePost)

	api.POST("/comments", handlers.CreateComment)

	api.GET("/posts/:id/comments", handlers.GetComments)

	api.DELETE("/comments/:id", handlers.DeleteComment)

	r.Run(":8080")
}