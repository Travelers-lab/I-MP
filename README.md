# A Reliable Robot Motion Planner - Project Page

A professional research paper showcase website for "A Reliable Robot Motion Planner in Complex Real-world Environments via Action Imagination" built for GitHub Pages.

## 🚀 Live Demo

Visit the live site: [GitHub Pages URL will be here after deployment]

## 📁 Project Structure

```
I-MP/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   ├── videos/             # Video files (add your own)
│   │   ├── header-bg.mp4   # Background video for hero section
│   │   ├── overview.mp4    # Overview section video
│   │   ├── vid1.mp4        # Gallery video 1
│   │   ├── vid2.mp4        # Gallery video 2
│   │   └── vid3.mp4        # Gallery video 3
│   └── images/             # Image files
│       └── fallback.svg    # Fallback poster for videos
├── README.md               # This file
└── 提示词.txt             # Original prompt file
```

## 🎥 Video Requirements

To complete the setup, you need to add the following video files to the `assets/videos/` directory:

1. **header-bg.mp4** - Background video for the hero section (should be visually appealing, can loop seamlessly)
2. **overview.mp4** - Main research overview video with controls
3. **vid1.mp4** - First gallery video (e.g., Complex Environment Navigation)
4. **vid2.mp4** - Second gallery video (e.g., Action Imagination Process)  
5. **vid3.mp4** - Third gallery video (e.g., Real-world Implementation)

### Video Specifications
- **Format**: MP4 (H.264 codec recommended for best browser compatibility)
- **Background video**: 1920x1080 or 1280x720, 10-30 seconds, optimized for autoplay
- **Content videos**: Any resolution, but 1080p or 720p recommended
- **File size**: Keep under 50MB each for optimal loading (compress if needed)

## ⚙️ Setup Instructions

### 1. Local Development

1. Clone or download this repository
2. Add your video files to `assets/videos/` directory
3. Open `index.html` in a web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. Navigate to `http://localhost:8000`

### 2. GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" 
4. Choose "main" branch and "/ (root)" folder
5. Save and wait for deployment

**Note**: GitHub has file size limits. If your videos are large, consider:
- Using Git LFS for video files
- Hosting videos externally (YouTube, Vimeo) and embedding them
- Compressing videos before upload

### 3. Customization

#### Update Content
- **Paper Title**: Edit the `<h1>` in the hero section
- **Authors**: Update the authors list in the `.authors` section
- **Abstract**: Replace placeholder text in the `.abstract` section
- **Links**: Update the `href="#"` placeholders with actual PDF and GitHub URLs

#### Update Links
```html
<!-- Paper Button -->
<a href="https://your-paper-url.pdf" class="btn btn-primary" target="_blank">

<!-- Code Button -->  
<a href="https://github.com/your-username/your-repo" class="btn btn-secondary" target="_blank">
```

#### Styling
- Colors: Modify CSS variables in `:root` section of `style.css`
- Fonts: Change Google Fonts imports in HTML head
- Layout: Adjust grid and spacing variables in CSS

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Video Background**: Full-screen hero video with overlay
- **Smooth Navigation**: Scrollspy navigation with smooth scrolling
- **Mobile Menu**: Hamburger menu for mobile devices
- **Video Gallery**: Responsive grid of research videos
- **Performance Optimized**: Lazy loading, video pause on scroll
- **Accessibility**: Keyboard navigation, reduced motion support
- **SEO Ready**: Proper meta tags and semantic HTML

## 🛠️ Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile Optimization

The site is fully responsive with:
- Mobile-first CSS approach
- Touch-friendly navigation
- Optimized video loading on mobile
- Reduced motion support for accessibility

## 🔧 Troubleshooting

### Videos Not Playing
1. Ensure video files are in correct format (MP4 with H.264)
2. Check file paths are correct and case-sensitive
3. Verify videos are not corrupted
4. Check browser console for errors

### Large File Sizes
1. Compress videos using tools like HandBrake or FFmpeg
2. Consider hosting videos externally
3. Use Git LFS for version control of large files

### GitHub Pages Issues
1. Ensure all file paths are relative (no leading `/`)
2. Check that repository is public for free GitHub Pages
3. Wait for deployment to complete (can take a few minutes)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this template.

## 📞 Contact

For questions about this template, please open an issue on GitHub.

---

**Note**: Remember to replace placeholder content with your actual research content and update all links before deployment.