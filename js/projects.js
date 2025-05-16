// projects.js — Central configuration for all projects

// Featured projects to show on the homepage (max 4)
const featuredProjects = ['Alnssor Enterprise', 'Chat Starter', 'QR Generator Browser Extension', 'AttendList'];

// All projects data
const projects = [
  {
    title: 'Alnssor Enterprise',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/alnssorenterprise.png?raw=true',
    desc: 'A comprehensive website for Alnssor Enterprise showcasing their services and products.',
    link: 'https://alnssorenterprise.co/'
  },
  {
    title: 'QR Generator',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qr.png?raw=true',
    desc: 'A dynamic QR code generator tool enabling users to create customized QR codes.',
    link: 'https://qr.h190k.com'
  },
  {
    title: 'Chat Starter',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/wa.png?raw=true',
    desc: 'A tool to start chats with numbers without saving them on WhatsApp and Telegram.',
    link: 'https://wa.h190k.com'
  },
  {
    title: 'QR Generator Browser Extension',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/qrextension.png?raw=true',
    desc: 'A Chrome-based extension for generating QR codes directly in your browser.',
    link: 'https://github.com/H190K/qrcodegeneratorbrowserExtension',
    button: 'Download Extension'
  },
  {
    title: 'Check IP with Geolocation',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/checkip.png?raw=true',
    desc: 'A simple tool to check your public IP address, location, and other geolocation details like country, city, and timezone.',
    link: 'https://checkip.h190k.com'
  },
  {
    title: 'IPCheck – Advanced IP Analysis',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/ipcheck.png?raw=true',
    desc: 'Detailed breakdown of your IP, ISP, and security insights. Different UI and deployed on Netlify.',
    link: 'https://ipcheck.h190k.com'
  },
  {
    title: 'AttendList',
    img: 'https://github.com/H190K/h190k.com-repo/blob/main/attendlist.png?raw=true',
    desc: 'Automate attendance with instant QR codes; timestamped check-ins and CSV export.',
    link: 'https://attendlist.h190k.com'
  }
];

// Helper function to get featured projects
function getFeaturedProjects() {
  return projects.filter(project => featuredProjects.includes(project.title));
}

// Helper function to get all projects
function getAllProjects() {
  return projects;
}

export { projects, getFeaturedProjects, getAllProjects };
