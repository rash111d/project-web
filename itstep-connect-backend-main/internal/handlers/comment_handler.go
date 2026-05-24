package handlers

import (
	"itstep-connect/internal/database"
	"itstep-connect/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateComment(c *gin.Context) {
	var comment models.Comment

	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID := c.MustGet("user_id").(uint)
	comment.UserID = userID

	database.DB.Create(&comment)

	c.JSON(http.StatusOK, gin.H{
		"message": "Comment created",
		"comment": comment,
	})
}

func GetComments(c *gin.Context) {
	postID := c.Param("id")

	var comments []models.Comment

	database.DB.Where("post_id = ?", postID).Find(&comments)

	c.JSON(http.StatusOK, gin.H{
		"comments": comments,
	})
}

func DeleteComment(c *gin.Context) {
	id := c.Param("id")

	commentID, _ := strconv.Atoi(id)

	var comment models.Comment

	if err := database.DB.First(&comment, commentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Comment not found",
		})
		return
	}

	userID := c.MustGet("user_id").(uint)

	if comment.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Access denied",
		})
		return
	}

	database.DB.Delete(&comment)

	c.JSON(http.StatusOK, gin.H{
		"message": "Comment deleted",
	})
}