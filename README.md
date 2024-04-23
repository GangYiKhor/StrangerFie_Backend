# StrangerFie (Backend)

This prototype is built for a concept of group photo-taking with strangers. Anyone is free to stop by and take a photo. After the photo is completed, it can be saved for other purposes _(E.g. publish on social media platforms)._

This is a prototype built for Interaction Design Coursework of BSc IT at UWE, Bristol

## Server

The backend server is hosted on https://strangerfie-backend.azurewebsites.net
<br/>
Get a `Hello World!` on https://strangerfie-backend.azurewebsites.net/api/api

## Environment Settings

- Node Version `v20.3.1`
- PostgreSQL Version `v15.3`

## ENV Variables

```bash
NODE_ENV="development"
PLATFORM="local" # use "server" if deployed on cloud server
BG_REMOVE_METHOD="local" # use "api" if "local" fails
PORT="3001" # Any port number
FRONTEND_URL="YOUR_FRONTEND_URL" # Optional, if not set, allow any frontend server to connect
DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"
RAPID_API_KEY="YOUR_RAPID_API_KEY"
```

Get your API Key on [RapidAPI.com](https://rapidapi.com/hub)
<br/>
You can create a PostgreSQL server on [supabase.com](https://supabase.com/) if you do not have PostgreSQL installed

## Subscribe to Face and Plate Blurer API (Freemium)

Register your account at RapidAPI and subscribe to the Face and Plate Blurer API at [Face and Plate Blurer](https://rapidapi.com/firdavscoder1/api/face-and-plate-blurer).
<br/>
There should be a free subscription version with 100 requests/month limit.

## Subscribe to Background Removal API (Freemium)

Register your account at RapidAPI and subscribe to the Background Removal API at [Background Removal](https://rapidapi.com/api4ai-api4ai-default/api/background-removal4).
<br/>
There should be a free subscription version with 25 requests/month limit. (**2 requests per photo**)

## How to Setup/Run

```bash
# Only run on first time setup
npm install
npx prisma db push
npx prisma generate

# For development server
npm run start:dev

# For deployment server
npm run build
npm run start:prod
```

Open [http://localhost:3001](http://localhost:3001) with your browser, you will see `Hello World!`

<br/>

# Server Endpoints (For Development Purposes)

### Upload Image - `http://localhost:3001/api/upload-background`

#### Processes

- Update current group photo background image
- Re-merged previous photos

#### Request [POST]

```ts
body: {
  image: "base64_image_with_encoding_data";
}
```

#### Response

```ts
NO BODY
```

<hr/>

### Upload Image - `http://localhost:3001/api/upload-file`

#### Processes

- Remove background
- Blur faces
- Save into database
- Merge with other strangers (Blurred faces)
- Return back merged photo

#### Request [POST]

```ts
body: {
  image: "base64_image_with_encoding_data";
}
```

#### Response

```ts
body: {
	mergedImage: "base64_image_merged_with_strangers",
	onlyCurrentImage: "base64_image_only_current_person",
	id: "current_image_id"
}
```

<hr/>

### Complete Image - `http://localhost:3001/api/complete-image`

#### Processes

- Retrieve the current person's blurred face from database
- Merge with existing combined group photo from database
- Save into database to update
- Return the merged photo

#### Request [POST]

```ts
body: {
  id: "current_image_id";
}
```

#### Response

```ts
body: {
	image: "base64_image_with_blurred_faces",
}
```

<hr/>

### Publish Image - `http://localhost:3001/api/publish-image`

#### Processes

- Retrieve and Merge every previous person's face (Non-blurred)
- Save into database
- Archive all the photos in database
- Send back the merged photo

#### Request [GET]

```ts
NO PARAMS REQUIRED
```

#### Response

```ts
body: {
	image: "base64_image",
}
```

<hr/>

### Get Latest Published Image - `http://localhost:3001/api/get-latest-published-image`

#### Processes

- Retrieve latest published image

#### Request [GET]

```ts
NO PARAMS REQUIRED
```

#### Response

```ts
body: {
	image: "base64_image",
}
```

<hr/>

### Has Published Image - `http://localhost:3001/api/has-published-image`

#### Processes

- Check if there is any published image in the database

#### Request [GET]

```ts
NO PARAMS REQUIRED
```

#### Response

```ts
body: {
	status: "boolean",
}
```

<hr/>

### Is Setup - `http://localhost:3001/api/is-setup`

#### Processes

- Check if there is already background image taken

#### Request [GET]

```ts
NO PARAMS REQUIRED
```

#### Response

```ts
body: {
	status: "boolean",
}
```

## To Deploy onto Azure Function

1. Create your Azure Function App on [Azure Portal](https://portal.azure.com/#home)
2. Install `Azure` extension on your VSCode
3. Clone this repository
4. Run `npm run install`
5. Run `npm run build`
6. Open `Azure` extension, and Login to your Azure Account
7. Search for the Function App
8. Right-Click, Select Deploy to Function App

### Future References

When building the deployment settings _(Already done on this repo)_:

- You need to `npm install @schematics/angular` first
- Then, run `npx nest add @nestjs/azure-func-http`
- You may encounter some dependency issues
- It can be fixed by downgrading `reflect-metadata` to `v0.1.13`
