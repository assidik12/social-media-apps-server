# teknologi yang di gunakan :

- node js
- express js
- mysql
- bycript
- knex
- socket.io
- passport
- multer
- redis

# api management

## register & login

- POST /user/register

request body :

```json
{
  "username": "username",
  "email": "email",
  "nomor telphone": "xxxx",
  "password": "password",
  "foto profile": "contoh.jpg",
  "bio": "masukan moto anda"
}
```

- POST /user/auth/login

request body :

```json
{
  "email": "sofi.sidik12@gmail.com",
  "password": "sidik123"
}
```

response :

```json
{
  "success": true,
  "statusCode": 200,
  "message": "succes",
  "payload": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvZmkiLCJlbWFpbCI6InNvZmkuc2lkaWsxMkBnbWFpbC5jb20iLCJhbGFtYXQiOiJicmViZXMiLCJub190ZWxwIjoiMDg5NTMzODkzMzMzMCIsImZvdG9fcHJvZmlsIjpudWxsLCJiaW9ncmFmaSI6ImFrdSBhZGFsYWggc2VvcmFuZyBjdWN1IG5hYmkgYWRhbSIsImlhdCI6MTcwNjY2OTY4OH0.Zprqqt5cx34ju7sRjGHwGTPeJwHT-QSHZeBggI66r1s"
  }
}
```

- PATCH /user/username

request body :

```json
{
  "username": "username",
  "email": "email",
  "nomor telphone": "xxxx",
  "password": "password",
  "foto profile": "contoh.jpg",
  "bio": "masukan moto anda"
}
```

response body :

```json
{
  "success": true,
  "statusCode": 200,
  "message": "succes",
  "payload": {
    "message": "Data pengguna berhasil diperbarui"
  }
}
```

- DELETE /user/email

request body :

```json
{
  "username": "username",
  "email": "email",
  "password": "password"
}
```

- GET /user/profile

## follow friend

- POST /follow

request body :

```json
{
  "id user 1": " id user",
  "id user 2": " id user",
  "status": " followed"
}
```

- GET /friends/user-id

## komentar

- POST /comment/user

request body :

```json
{
  "id postingan": "id postingan",
  "id user": "id users",
  "tanggal komenn": "tanggal komenn",
  "isi komentar": "isi komentar"
}
```

- DELET /comment/user ID

request body :

```json
{
  "id postingan": "id postingan",
  "id user": "id users",
  "tanggal komenn": "tanggal komenn",
  "isi komentar": "isi komentar"
}
```

- GET /comment

## like

- POST /like/user

request body :

```json
{
  "id postingan": "id postingan",
  "id user": "id users",
  "isi like": "isi like"
}
```

- DELET /like/user ID

request body :

```json
{
  "id postingan": "id postingan"
}
```

- GET /like

## postingan

- POST /postingan/user

request body :

```json
{
  "id user": "id users",
  "isi postingan": "isi postingan",
  "foto": "foto.jpg",
  "tanggal posting": "10-10-2024"
}
```

- DELET /posting/user ID

request body :

```json
{
  "id postingan": "id postingan"
}
```

- GET /posting/id-user

request body :

```json
{
  "status": "followed"
}
```
