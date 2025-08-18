# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9a5a9140-0c5b-439d-8132-9e9e49a41593

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9a5a9140-0c5b-439d-8132-9e9e49a41593) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

Note: the other option **which we are not going to use** was to publish via Lovable.


### Automatic Deployment (Recommended)

**To update the live site:**

1. Make your changes in a branch
2. Run `npm run dev` and make sure the site looks as you expect it
3. Commit and push your changes to the `main` branch
4. GitHub Actions will automatically:
   - Build your project
   - Deploy it to GitHub Pages
5. Your changes will be live.

### Manual Build (for testing)

If you want to test the production build locally:

```sh
npm run build
```

This will generate the production files in the root directory. **Note**: These files are automatically generated and should not be committed to git.

### GitHub Pages Configuration

- **Source**: GitHub Actions (deploy from a branch)
- **Branch**: `main`
- **Folder**: `/` (root)
- **URL**: https://bayraagis.github.io/bayraagis-echo-chamber/

The site automatically rebuilds and deploys whenever you push changes to the main branch.
