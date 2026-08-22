# How to Host Your Website on GitHub Pages

This guide outlines the step-by-step process to host your new **Radha Krishna Traders** website on **GitHub Pages** for free. Since this is a static website (HTML, CSS, JS, and image assets), it can be served directly from a GitHub repository.

---

## Prerequisites
1. A **GitHub account**. If you don't have one, sign up for free at [github.com](https://github.com/).
2. **Git** installed on your computer, or the **GitHub Desktop** application.
   - Download GitHub Desktop (easiest for beginners): [desktop.github.com](https://desktop.github.com/)
   - Or download Git Command Line: [git-scm.com](https://git-scm.com/)

---

## Method 1: Uploading Directly on the GitHub Website (Easiest - No Software to Install)

### Step 1: Create a New Repository
1. Go to [github.com](https://github.com/) and sign in.
2. In the top-right corner, click the **`+`** icon and select **New repository**, or click the green **New** button on your dashboard.
3. In the **Repository name** box, type: `radhe-krishna-traders`
4. Under visibility, choose **Public** (this is required to host your website for free).
5. Leave all checkboxes (Add a README file, Add .gitignore, Choose a license) **unchecked**.
6. Click the green **Create repository** button at the bottom.

### Step 2: Upload Your Files
1. You will be taken to a page with setup instructions. Look for the sentence: 
   *"Get started by creating a new file or **uploading an existing file**."*
2. Click the blue **uploading an existing file** link.
3. Open your computer's file explorer to the folder: `D:\digital marketing`.
4. Select all the files:
   - [`index.html`](file:///d:/digital%20marketing/index.html)
   - [`styles.css`](file:///d:/digital%20marketing/styles.css)
   - [`app.js`](file:///d:/digital%20marketing/app.js)
   - The [`assets`](file:///d:/digital%20marketing/assets) folder
5. Drag and drop these files and folder together directly into the upload area of your web browser.
6. Wait for all files to finish uploading (you will see their progress bars complete).

### Step 3: Commit Changes
1. Scroll down to the bottom section called **Commit changes**.
2. In the first box (Commit summary), type: `Upload Radha Krishna Traders website files`
3. Ensure **Commit directly to the `main` branch** is selected.
4. Click the green **Commit changes** button. Your files are now uploaded!

---

## Method 2: Using GitHub Desktop

### Step 1: Add Your Local Repository to GitHub Desktop
1. Open **GitHub Desktop**.
2. Click on **File** in the top menu and select **Add Local Repository...** (or press `Ctrl + O`).
3. Click **Choose...** and select your project folder: `D:\digital marketing`.
4. Click **Add Repository**.
5. *Note: If GitHub Desktop says "this directory does not appear to be a Git repository," click the link that says **create a repository here** first, then name it `radhe-krishna-traders` and click Create.*

### Step 2: Commit Your Code
1. In the left-hand panel of GitHub Desktop, you will see a list of all your files (like `index.html`, `styles.css`, `app.js`, and the `assets/` folder).
2. In the bottom-left corner, enter a summary message in the **Summary** box, for example: `Initial commit of Radha Krishna Traders Nagpur website`.
3. Click the blue **Commit to main** button.

### Step 3: Publish to GitHub
1. Click the **Publish repository** button at the top menu bar.
2. In the popup window:
   - **Name**: `radhe-krishna-traders`
   - **Description**: `Premium Red Chilli trading website for Radha Krishna Traders, Nagpur.`
   - **Keep this code private**: **Uncheck this box** (GitHub Pages requires the repository to be public to host for free, unless you have a paid GitHub Pro account).
3. Click **Publish Repository**. Your website is now pushed online to GitHub!

---

## Method 3: Using the Command Line (Git CLI)

If you prefer to use the terminal/powershell, run these commands inside your project folder (`D:\digital marketing`):

```powershell
# 1. Initialize git in the folder
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit of Radha Krishna Traders website"

# 4. Rename default branch to main
git branch -M main

# 5. Link your local project to your new GitHub repository
# (Create a new public repository on github.com first to get this URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/radhe-krishna-traders.git

# 6. Push code to GitHub
git push -u origin main
```

---

## Step 4: Turn on GitHub Pages (Crucial Step)

Once your code is pushed successfully to GitHub:

1. Open your browser and go to your repository page (e.g., `https://github.com/YOUR_USERNAME/radhe-krishna-traders`).
2. Click on the **Settings** tab (the gear icon at the top menu bar of your repository).
3. In the left-hand sidebar, under the "Code and automation" section, click on **Pages**.
4. Under the **Build and deployment** section, look for **Source**. Make sure it is set to **Deploy from a branch**.
5. Under **Branch**, change the dropdown from `None` to **`main`** (or `master`), and leave the folder dropdown as **`/ (root)`**.
6. Click the **Save** button.

---

## Step 5: View Your Live Website!

1. After saving, wait about 1-2 minutes for GitHub to process the deployment.
2. Refresh the **Settings > Pages** screen. 
3. At the top of the page, you will see a box with a green checkmark saying:
   > **Your site is live at:** `https://YOUR_USERNAME.github.io/radhe-krishna-traders/`
4. Click the link to open your live Nagpur Red Chilli website!

---

> [!TIP]
> **Updating the Website Later:**
> Whenever you modify files in the future, simply open GitHub Desktop (or run `git commit` and `git push`), commit the changes, and push them to GitHub. GitHub Pages will automatically update your live site within a minute!
