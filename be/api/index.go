package handler

import (
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
	"github.com/supabase-community/supabase-go"
)

// Create a Gin engine instance
var engine = gin.New()
var supabaseUrl = os.Getenv("SUPABASE_URL")
var supabaseKey = os.Getenv("SUPABASE_KEY")
var supabaseClient *supabase.Client

type Article struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Subtitle  string `json:"subtitle"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	Section   string `json:"section"`
}

type Blog struct {
	ID        int64    `json:"id"`
	Title     string   `json:"title"`
	Slug      string   `json:"slug"`
	Content   string   `json:"content"`
	Excerpt   string   `json:"excerpt"`
	Author    string   `json:"author"`
	ImageURL  string   `json:"image_url"`
	Category  string   `json:"category"`
	Tags      []string `json:"tags"`
	Status    string   `json:"status"`
	CreatedAt string   `json:"created_at"`
	UpdatedAt string   `json:"updated_at"`
	ViewCount int      `json:"view_count"`
	LikeCount int      `json:"like_count"`
}

func init() {

	var err error
	supabaseClient, err = supabase.NewClient(supabaseUrl, supabaseKey, nil)
	if err != nil {
		log.Fatalf("Error initializing Supabase client: %v", err)
	}

	// CORS 配置
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	// config.AllowOrigins = []string{"http://localhost:3000", "https://your-frontend-domain.com"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	engine.Use(cors.New(config))

	// url: https://mvp-be.vercel.app/hello?name=Charles
	engine.GET("/hello", func(c *gin.Context) {
		name := c.DefaultQuery("name", "Guest")
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, " + name + "!",
		})
	})

	// url: https://mvp-be.vercel.app/articles?num=10&page=1
	engine.GET("/articles", func(c *gin.Context) {
		num := c.DefaultQuery("num", "10")  // 默认获取10条记录
		page := c.DefaultQuery("page", "1") // 默认获取第1页

		// Convert string parameters to integers
		numInt, _ := strconv.Atoi(num)
		pageInt, _ := strconv.Atoi(page)

		start := (pageInt - 1) * numInt
		end := pageInt*numInt - 1

		var articles []Article
		_, err := supabaseClient.From("articles").
			Select("id, title, subtitle, content, created_at, section", "", false).
			Order("section", &postgrest.OrderOpts{Ascending: true}).
			Range(start, end, "").
			ExecuteTo(&articles)

		if err != nil {
			log.Printf("Error fetching articles: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching articles"})
			return
		}

		// Get total count
		var count int64
		countResult, _, err := supabaseClient.From("articles").
			Select("id", "exact", true).
			Execute()

		if err != nil {
			log.Printf("Error getting total count: %v", err)
			count = 0
		} else {
			count = countResult.Count
		}

		c.JSON(http.StatusOK, gin.H{
			"data":  articles,
			"total": count,
			"error": nil,
		})
	})

	// url: https://mvp-be.vercel.app/blogs?num=10&page=1
	engine.GET("/blogs", func(c *gin.Context) {
		num := c.DefaultQuery("num", "10")  // 默认获取10条记录
		page := c.DefaultQuery("page", "1") // 默认获取第1页

		// Convert string parameters to integers
		numInt, _ := strconv.Atoi(num)
		pageInt, _ := strconv.Atoi(page)

		start := (pageInt - 1) * numInt
		end := pageInt*numInt - 1

		var blogs []Blog
		_, err := supabaseClient.From("blogs").
			Select("*", "", false).
			Order("created_at", &postgrest.OrderOpts{Ascending: false}).
			Range(start, end, "").
			ExecuteTo(&blogs)

		if err != nil {
			log.Printf("Error fetching blogs: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching blogs"})
			return
		}

		// Get total count
		var count int64
		countResult, _, err := supabaseClient.From("blogs").
			Select("id", "exact", true).
			Execute()

		if err != nil {
			log.Printf("Error getting total count: %v", err)
			count = 0
		} else {
			count = countResult.Count
		}

		c.JSON(http.StatusOK, gin.H{
			"data":  blogs,
			"total": count,
			"error": nil,
		})
	})

	// url: https://mvp-be.vercel.app/blogs
	engine.POST("/blogs", func(c *gin.Context) {
		var newBlog Blog
		if err := c.ShouldBindJSON(&newBlog); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Generate a unique ID based on the current timestamp and a random suffix
		source := rand.NewSource(time.Now().UnixNano())
		r := rand.New(source)
		randomSuffix := r.Intn(1000)                                            // Generate a random number between 0 and 999
		newBlog.ID = int64(time.Now().UnixNano()/1000000) + int64(randomSuffix) // Convert nanoseconds to milliseconds and add random suffix

		_, _, err := supabaseClient.From("blogs").Insert(newBlog, false, "", "", "").Execute()
		if err != nil {
			log.Printf("Error inserting blog: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error inserting blog"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "Blog created successfully",
			"data":    newBlog,
		})
	})

	// Handle 404 Not Found
	engine.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Not Found",
		})
	})
}

// Handle is the entry point for Vercel Serverless Functions
func Handle(w http.ResponseWriter, r *http.Request) {
	engine.ServeHTTP(w, r)
}
