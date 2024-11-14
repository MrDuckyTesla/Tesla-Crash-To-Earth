// let tesla;
// // VERY SCARY (APCSA)
// // Thanks John (ELA)
// // They really just wanted to hug Thor... (HALLOWEEN)
// // 199 199 199 and 201 201 201 work but not 200 200 200 (<-- EVIL NUMBER)
// // 0 0 89 70 70 255 111 111 255 145 145 255 245 129 135 248 154 158 (good numbers :D)

// function preload() {
//   tesla = loadImage("Assets/tesla.png");  // Load spritesheet
// }

// function setup() {
//   createCanvas(500, 500);
//   noStroke();  // No outlines
//   noSmooth();  // No blur
//   // let rgbL = listAdd(colorVarientBody(111, 111, 255), colorVarientVisor(255, 111, 111));
//   // RGB values should range from 166 - 221 for maximun effect
//   imageColorRGB(tesla, listAdd(colorVarientBody(255, 111, 255), colorVarientVisor(255, 111, 255)));  // Change image colors
// }

// function draw() {
//   image(tesla, 0, 0, 140, 140, 16 * 28, 0, 28, 28);  // Draw sprite
// }
// //  old list is evil -> [30, 132, 159, 182, 170, 187]
// function imageColorRGB(img, rgbList, imgwidth=img.width, imgheight=img.height, startY=0, orgrgbList=[30, 132, 159, 182, 170, 187]) {  // Changes color of image
//   // takes in image, rgb values, width, height, starting Y value, and the origional rgb values associated wth the image (because the image is unsaturated, the list would be 30, 30, 30, 132, 132, 132...ect)
  
//   let pixelList = [0, 1, 2];  // Determines which RGB value gets changed (0 = r, 1 = g, 2 = b)
//   for (let f = 0; f < pixelList.length; f ++) {  // Iterate through list length
//     pixelList[f] += imgwidth * startY;  // Start the pixelList at startY * width
//   }
//   img.loadPixels();  // Load pixels for changing
//     for (let j = 0; j < imgwidth; j++) {  // Iterate through Width
//       for (let l = 0; l < imgheight; l++) {  // Iterate through Image Height
//         for (let y = 0; y < orgrgbList.length; y++) {  // Iterate through original list
//           if (img.pixels[pixelList[0]] == orgrgbList[y]) {  // If origional color == pixel color
//             img.pixels[pixelList[0]] = rgbList[y * 3];  // Red of image
//             img.pixels[pixelList[1]] = rgbList[y * 3 + 1];  // Green of image
//             img.pixels[pixelList[2]] = rgbList[y * 3 + 2];  // Blue of image
//             y = orgrgbList.length;  // Only change one color, exit loop when done
//           }
//         }
//         for (let t = 0; t < pixelList.length; t++) {  // Iterate through list length
//           pixelList[t] += 4;  // Add num to List at index t
//         }
//       }
//     }
//   img.updatePixels();  // Update Pixels from the changes made
// }

// function colorVarientBody (r, g, b) {
//   let colorList = [];  // List to store new colors in
//   if (r == g && g == b && r == b)  // If Red, Green, and Blue are all equal
//     colorList = [r - 166, r - 166, r - 166, r - 41, r - 41, r - 41, r, r, r, r + 34, r + 34, r + 34];  // Assign values
//   // If 2 of the 3 values are equal, and are larger than the other value
//   else if (r == g && r != b && r > b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is greater than Blue
//     colorList = [r - 166, g - 166, b - 111, r - 41, g, b - 41, r, g, b, r + 34, g, b + 34];  // Assign values
//   else if (r == b && r != g && r > g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is greater than Green
//     colorList = [r - 166, g - 111, b - 166, r - 41, g, b - 41, r, g, b, r + 34, g, b + 34];  // Assign values
//   else if (g == b && g != r && g > r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is greater than Red
//     colorList = [r - 111, g - 166, b - 166, r, g - 41, b - 41, r, g, b, r, g + 34, b + 34];  // Assign values
//   // If 2 of the 3 values are equal, and are smaller than the other value
//   else if (r == g && r != b && r < b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is less than Blue
//     colorList = [r - 111, r - 111, b - 166, r - 41, r - 41, b, r, r, b, r + 34, r + 34, b];  // Assign values
//   else if (r == b && r != g && r < g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is less than Green
//     colorList = [r - 111, g - 166, r - 111, r - 41, g, r - 41, r, g, r, r + 34, g, r + 34];  // Assign values
//   else if (g == b && g != r && g < r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is less than Red
//     colorList = [r - 166, g - 111, g - 111, r, g - 41, g - 41, r, g, g, r, g + 34, g + 34];  // Assign values
//   // Else, the color is random
//   else {
//     if (max(r, g, b) == r)  // If Red is the greatest number
//       colorList = [r - 166, (g + b)/2 - 111, (g + b)/2 - 111, r - 41, (g + b)/2, (g + b)/2, r, (g + b)/2, (g + b)/2, r + 34, (g + b)/2, (g + b)/2];  // Assign values
//     else if (max(r, g, b) == g)  // If Green is the greatest number
//       colorList = [(r + b)/2 - 111, g - 166, (r + b)/2 - 111, (r + b)/2, g - 41, (r + b)/2, (r + b)/2, g, (r + b)/2, (r + b)/2, r + 34, (r + b)/2];  // Assign values
//     else if (max(r, g, b) == b)  // If Blue is the greatest number
//       colorList = [(r + g)/2 - 111, (r + g)/2 - 111, b - 166, (r + g)/2, (r + g)/2, b - 41, (r + g)/2, (r + g)/2, b, (r + g)/2, (r + g)/2, b + 34];  // Assign values
//   }
//   for (let i = 0; i < colorList.length; i++) {  // Iterate through newly made list
//     if (colorList[i] < 0)  // If list at index i is less than 0
//       colorList[i] *= -1;  // Multiply by -1
//     if (colorList[i] > 255)  // If list at index i is greater than 255
//       colorList[i] = 255;  // Reassign to 255
//   }
//   return colorList;  // Return list
// }

// function colorVarientVisor (r, g, b) {
//   let colorList = [];  // List to store new colors in
//   // [235, 132, 132]
//   // [255, 170, 170]
//   if (r == g && g == b)
//     colorList = [r - 20, g - 20, b - 20, r, g, b];  // Assign values
//   else if (r == g && r != b && r > b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is greater than Blue
//     colorList = [r - 20, g - 20, b + 21, r, g, b + 59];  // Assign values
//   else if(r == b && r != g && r > g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is greater than Green
//     colorList = [r - 20, g + 21, b - 20, r, g + 59, b];  // Assign values
//   else if(g == b && g != r && g > r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is greater than Red
//     colorList = [r + 21, g - 20, b - 20, r + 59, g, b];  // Assign values
//   else if (r == g && r != b && r < b)  // Else if Red and Green are equal, Red is not equal to Blue, and Red is less than Blue
//     colorList = [r + 21, g + 21, b - 20, r + 59, g + 59, b];  // Assign values
//   else if(r == b && r != g && r < g)  // Else if Red and Blue are equal, Red is not equal to Green, and Red is less than Green
//     colorList = [r + 21, g - 20, b + 21, r + 59, g, b + 59];  // Assign values
//   else if(g == b && g != r && g < r)  // Else if Green and Blue are equal, Green is not equal to Red, and Green is less than Red
//     colorList = [r - 20, g + 21, b + 21, r, g + 59, b + 59];  // Assign values
//   else if (max(r, g, b) == r)  // If Red is the greatest number
//     colorList = [r - 20, g + 21, b + 21, r, g + 59, b + 59];  // Assign values
//   else if (max(r, g, b) == g)  // If Green is the greatest number
//     colorList = [r + 21, g - 20, b + 21, r + 59, g, b + 59];  // Assign values
//   else if (max(r, g, b) == b)  // If Blue is the greatest number
//     colorList = [r + 21, g + 21, b - 20, r + 59, g + 59, b];  // Assign values
//   for (let i = 0; i < colorList.length; i++) {  // Iterate through newly made list
//     if (colorList[i] < 0)  // If list at index i is less than 0
//       colorList[i] *= -1;  // Multiply by -1
//     if (colorList[i] > 255)  // If list at index i is greater than 255
//       colorList[i] = 255;  // Reassign to 255
//   }
//   return colorList;
// }

// function listAdd(list1, list2) {
//   let newList = [];
//   for (let i = 0; i < list1.length; i ++) {
//     newList.push(list1[i]);
//   }
//   for (let j = 0; j < list2.length; j ++) {
//     newList.push(list2[j]);
//   }
//   return newList;
// }
