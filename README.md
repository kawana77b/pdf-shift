# pdf-shift

![demo](/docs/images/demo.gif)

PDF Shift is a desktop application that allows you to open a PDF, swap pages, delete any portion, and save it as a separate PDF (or overwrite it).

## Env & Install

This app is built for Windows x64 and Linux x64.  
The necessary resources are available from the [Release Page](https://github.com/kawana77b/pdf-shift/releases).

The Linux version is provided by AppImage and requires execution permissions and Fuse to be available.

The author has tested this app on Windows 11 and Ubuntu (GNOME). This application is not signed.

## Usage

- Once the app is launched, set up the PDF file from the dialog by drag-and-drop or load button.
- Replace or delete pages.
- Click the Save button to save the file.
- The Reset button restores the currently edited content to its initial state.
- The Clear button clears all states and leaves the workspace in a clean state.
- The file extension must be `.pdf` when opening and saving the file.

## Why did you make this?

The primary reason was that the author wanted to create a demonstration to show that he has a certain technical stack with respect to Electron and Typescript.
(In other words, this is not a repository for active development.)

My direct motivation was that after I gave some kind of PowerPoint presentation, I thought it would be useful to be able to erase pages related to privacy when uploading the PDF file to a public place.

## Tech Background

Although modest, my efforts include the following technical background:

- 🚀 It uses `Electron`, and `Next.js` on the front end, and will utilize `React` technology.
  - Being an app router is not utilized, but building on this project is possible as of 2024. In other words, this is one example of combining an Electron front end with Next.js
- 🎨 The UI uses the popular `shadcn/ui` and supports light and dark modes.
- 🍃 The above of course means using `tailwind css`!
- 👾 Construction is based on popular javascript libraries as of 2024 such as `dnd-kit`, `zod`, `framer-motion`, `nanoid`, `zustand`, etc.
- 🚢 Build and release apps using multiple OS with GitHub Actions.

## What is the main technical trick in this application?

What we want to do in this application, i.e., editing, is page editing from the source PDF with `pdf-lib`,  
but to provide a page view to the front end, we first generate base64 png data with `pdfium` and pass it to the renderer process. This is the main trick I am doing in this app.  
I initially accomplished this with my own .NET tools, but was very pleased when I discovered [pdfium's WebAssembly wrapper](https://github.com/hyzyla/pdfium). (Great job!)

> [!NOTE]
> Therefore, files that are rarely interpreted by `pdf-lib` cannot be edited by this application. You may be notified that there is an error.
> Please note that this is a demonstration app and I am not personally interested in pursuing the cause of such problems at this time.
