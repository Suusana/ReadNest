# ReadNest

## Introduction

This project is a **library Management System**. 

The purpose of this project is to provide a simple and convenient way to manage a book collection.

Users can maintain their book collection, borrow and return books, and keep track of their borrowed books. Administrators can manage the books and borrow records in the system.

## Technology Used

- Backend: Java - (Framework: Spring Boot 3.4.0)
- Frontend: TypeScript - (Framework: React 18.3.1, Build tool: Vite)
- Database: MySQL - (SQL Mapper: Mybatis 3.0.4)
- Simple Object Storage: Cloudflare R2

## Features

### Login
User can type their username (email) and password to login to the system.

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/ef16d90b-f687-4989-98c9-e9b74c196feb" />

### Sign Up
If User does not have an account, they can register a new account by typing the key information.

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/16d1579c-9b50-4e8d-b969-bc89c63aaf71" />

### Admin
Admin role users will jump to admin management homepage.

This interface is designed for mobile devices.

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/de5b0e40-2cc0-4b1c-9bec-f8bb01cd15fa" />

- User Management (Planning to add actual actions)

Admin can view all users in user management page

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/e772637f-5157-42e6-9889-1f5fd2aeade7" />

- Book Management

Admin can manage all books in readnest, including Search, View, Add, Update, Delete and bulk delete book records. 

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/abc13952-e885-475e-b5fd-a2ffd19926c0" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/1ebad6cc-a15a-4fe7-a09a-c7c2c3679988" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/609ed71a-cfbb-4ef1-a292-78c011c77d03" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/c88a9fb3-b8db-4c9e-931c-0e52034fd715" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/e08f0026-7bc1-43c6-8154-6b0d09bb20f8" />

- Categories
Admin can also manage these book categories (Tags) - View, Add, Edit, Delete

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/a592ead4-a7fc-479c-9b34-92019e89634f" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/302fcac6-5d47-4301-87fe-71077e7dfc5b" />

- Borrowing Records (Planning to add notification function when users return date is expired)

Admin can view all borrowing records from general users and search by status, duration or keywords

<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/c3f4a3bf-e138-4627-b9fa-b68978a078cd" />
<img width="1920" height="869" alt="image" src="https://github.com/user-attachments/assets/dbdfa833-3fa9-45b7-8d78-6068038508b0" />

### User

The user interface is designed for mobile devices.

- Homepage
Users can see some recommended books in here and also search for the book that they want.

They can also borrow the book if they want, this will generate a borrowing record in borrow page

<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/15da9f6c-bc26-4729-94e0-3eb0d1f0b4f3" />
<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/99cc62de-776b-493d-a88b-9735cb8b5daf" />

- Search Result

Once user search for a keyword, they will see the result in result page

<img width="384" height="205" alt="image" src="https://github.com/user-attachments/assets/aa480217-3c2f-429c-b0db-42fc88f5ce76" />
<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/9907c546-7b99-4a24-807e-4e33a4d3c7be" />

- Borrow
Borrow page will see all the current user's borrowing records

<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/86e12f1a-757b-4fb7-a173-cf6448ac1747" />


- My Info

Users can see their account information in My Info page. It's able to change their avatar, password and logout.

<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/b3728d68-f3a4-494f-a766-2a939f05b3ce" />
<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/4c0a3d0e-377b-4775-b6c9-afb49d397655" />
<img width="326" height="727" alt="image" src="https://github.com/user-attachments/assets/29e81032-33c5-41fe-8296-82b3847ef478" />

