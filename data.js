// Central Data Configuration File
// Edit this file to update the content on your portfolio website

const portfolioData = {
    personal: {
        name: "Ashmit Ghorpade",
        role: "Data Analyst",
        tagline: "Uncovering insights through data and analytics to drive strategic decisions.",
        email: "ashmitghorpade@gmail.com",
        location: "Dublin, Ireland",
        resumeLink: "assets/resume.pdf"
    },
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/ashmit-ghorpade-a85725230/",
        github: "https://github.com/ashmitghorpade"
    },
    about: {
        paragraphs: [
            "I am a passionate Data Analyst with a Master's degree in Data Analytics from Dublin City University. I specialize in transforming complex data into actionable business insights.",
            "With a strong foundation in statistical analysis, data visualization, and machine learning, I strive to solve challenging problems and optimize processes. My approach is structured, analytical, and highly focused on delivering measurable outcomes.",
            "I am currently looking for opportunities in Data Analyst, Business Analytics, or BI roles where I can leverage my technical skills and analytical mindset."
        ],
        skills: [
            "SQL", "Python", "R", "Power BI", "Excel", "Machine Learning", "Data Visualization", "Statistical Analysis", "Business Acumen and Problem Solving", "Storytelling with data"
        ]
    },
    projects: [
        {
            id: "project-1",
            title: "E-Commerce Sales Analysis",
            problem: "Identify key drivers of revenue loss in regional quarterly sales.",
            tools: ["Python", "Pandas", "Power BI", "SQL"],
            insights: "Discovered a 15% drop in retention due to shipping delays, proposing a localized inventory model that increases projected retention by 10%.",
            imagePlaceholder: "assets/images/project1.jpg",
            repoLink: "#", // Update with your actual repo link
            liveLink: "#"  // Optional live demo link
        },
        {
            id: "project-2",
            title: "Customer Churn Prediction",
            problem: "Predict which customers are at high risk of cancellation within the next 30 days.",
            tools: ["Python", "Scikit-Learn", "Matplotlib", "Seaborn"],
            insights: "Developed a Random Forest model achieving 89% accuracy, allowing the business to proactively target at-risk customers with retention campaigns.",
            imagePlaceholder: "assets/images/project2.jpg",
            repoLink: "#",
            liveLink: ""
        }
    ]
};

