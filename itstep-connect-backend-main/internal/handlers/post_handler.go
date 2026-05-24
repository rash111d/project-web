package handlers

import (
	"itstep-connect/internal/database"
	"itstep-connect/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CreatePostInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	UserID  uint   `json:"user_id"`
}

func CreatePost(c *gin.Context) {

	var input CreatePostInput

	if err := c.ShouldBindJSON(&input); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})

		return
	}

	post := models.Post{
		Title:   input.Title,
		Content: input.Content,
		UserID:  input.UserID,
	}

	database.DB.Create(&post)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Post created",
		"post":    post,
	})
}

func GetPosts(c *gin.Context) {

	var posts []models.Post

	database.DB.Find(&posts)

	c.JSON(http.StatusOK, gin.H{
		"posts": posts,
	})
}

func DeletePost(c *gin.Context) {

	id := c.Param("id")

	postID, _ := strconv.Atoi(id)

	var post models.Post

	result := database.DB.First(&post, postID)

	if result.Error != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post not found",
		})

		return
	}

	database.DB.Delete(&post)

	c.JSON(http.StatusOK, gin.H{
		"message": "Post deleted",
	})
}