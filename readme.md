1. **FFmpeg Installation:**
   - Make sure you have FFmpeg installed properly.

2. **Starting the Server:**
   - After cloning the repository, run the server using the command:
     ```
     npm run start
     ```

3. **Frontend: Video.js Integration:**
   - For the frontend, Video.js was used. You can find more information about Video.js at [videojs.com](https://videojs.com/).

4. **Uploading a Video:**
   - To upload a video, open Postman and create a new HTTP POST request to:
     ```
     http://localhost:/uploads
     ```
   - Upload a video file using this request.

5. **Video Chunk Conversion:**
   - The server will convert the uploaded video into small chunks.

6. **Obtaining the .m3u8 Link:**
   - In return, you will receive a link to a "sample.m3u8" file.

7. **Integrating the .m3u8 Link in the Frontend:**
   - Take the received "sample.m3u8" link and paste it in "./fronted/src/app.jsx" file.
   - Look for a variable called "videoLink" and replace its value with the "sample.m3u8" link.

8. **Running the React App:**
   - Run the React app using the command:
     ```
     npm run dev
     ```
   - Open the app in your web browser.
