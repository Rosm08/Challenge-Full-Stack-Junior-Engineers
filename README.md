# Challenge Full Stack Junior Engineers

Este proyecto es la solución del *Challenge Full Stack Junior Engineers*, que incluye **backend** y **frontend**.  
El backend está implementado con Node.js, TypeScript, Express y Sequelize sobre PostgreSQL, y el frontend con Vue.js + Vite.

## Tecnologías utilizadas

- Node.js + Express  
- TypeScript  
- Sequelize ORM  
- PostgreSQL  
- Vue.js + Vite  
- dotenv para la carga de variables de entorno  


## Instalación 

### 1. Clonar el repositorio

-en el bash: 

git clone https://github.com/Rosm08/Challenge-Full-Stack-Junior-Engineers.git

cd Challenge-Full-Stack-Junior-Engineers

git checkout develop 

cd backend
npm install 

### 2. Crear archivo .env en backend/ con este contenido (ajustarlo a su dato):

DB_NAME=nombre_de_tu_base
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3001

### 3. Crear la base de datos en PostgreSQL:

-> CREATE DATABASE nombre_de_tu_base;

### 4. Luego levantar el servidor con el comando:

 -> npm run dev

 ### 5. Configurar Frontend

En una nueva terminal:

cd frontend
npm install


Iniciar el cliente con el comando:

npm run dev



## Endpoints principales del Backend:

* GET	/orders/?page=1&page_size=5	--> Ejemplo de lista paginada de órdenes
* POST	/orders/	--> Crear una nueva orden
* PUT	/orders/:id	--> Actualizar una orden
* DELETE	/orders/:id	--> Eliminar una orden

 



