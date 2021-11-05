​

### ESSENTIAL GET `/api/articles`

​
Assertion: The first article should have a comment count of 2: expected '0' to equal '2'
​
Hints:
​

- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows
  ​

### ESSENTIAL GET `/api/articles?sort_by=author`

​
Assertion: expected 'butter_bridge' to equal 'rogersop'
​
Hints:
​

- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article
  ​

### ESSENTIAL GET `/api/articles?order=asc`

​
Assertion: Cannot read properties of undefined (reading '0')
​
Hints:
​

- accept an `order` query of `asc` or `desc`
  ​

### ESSENTIAL GET `/api/articles?topic=paper`

​
Assertion: expected 404 to equal 200
​
Hints:
​

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists
  ​

### ESSENTIAL PATCH `/api/articles/1`

​
Assertion: expected 400 to equal 200
​
Hints:
​

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
  ​

### ESSENTIAL GET `/api/articles/2/comments`

​
Assertion: expected 404 to equal 200
​
Hints:
​

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments
  ​

### ESSENTIAL POST `/api/articles/1/comments`

​
Assertion: expected 500 to equal 201
​
Hints:
​

- use a 201: Created status code for a successful `POST` request
  ​

### ESSENTIAL POST `/api/articles/1/comments`

​
Assertion: expected { message: 'Internal Server Error' } to contain key 'comment'
​
Hints:
​

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README
  ​

### ESSENTIAL POST `/api/articles/1/comments`

​
Assertion: Cannot read properties of undefined (reading 'votes')
​
Hints:
​

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations
  ​

### ESSENTIAL POST `/api/articles/10000/comments`

​
Assertion: expected 500 to be one of [ 404, 422 ]
​
Hints:
​

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist
  ​

### ESSENTIAL POST `/api/articles/not-a-valid-id/comments`

​
Assertion: expected 500 to equal 400
​
Hints:
​

- use a 400: Bad Request when `POST` contains an invalid article_id
  ​

### ESSENTIAL POST `/api/articles/1/comments`

​
Assertion: expected 201 to be one of [ 404, 422 ]
​
Hints:
​

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist
