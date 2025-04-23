// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-969-days-in-the-life-of-a-data-analyst",
        
          title: "969 days in the life of a Data Analyst",
        
        description: "A summary of what I did in my previous industry job.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/969-days-in-the-life-of-a-data-analyst/";
          
        },
      },{id: "post-quick-introduction-to-federated-learning",
        
          title: "Quick introduction to Federated Learning",
        
        description: "A short technical introduction to federated learning, a framework for privacy preserving machine learning.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/quick-introduction-to-federated-learning/";
          
        },
      },{id: "post-what-s-it-like-to-study-in-a-master-s",
        
          title: 'What’s it like to study in a Master’s? <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Quick notes on how studying in a Master&#39;s differs from other levels",
        section: "Posts",
        handler: () => {
          
            window.open("https://giangson.me/blog/whats-it-like-to-study-in-a-masters/", "_blank");
          
        },
      },{id: "post-gentle-introduction-to-linear-regression",
        
          title: "Gentle introduction to Linear Regression",
        
        description: "A gentle introduction to the simplest machine learning problem, linear regression.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/gentle-introduction-to-linear-regression/";
          
        },
      },{id: "post-my-tutoring-experience",
        
          title: "My tutoring experience",
        
        description: "Looking back at the times when I shared my knowledge",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/my-tutoring-experience/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-finished-my-969-day-journey-as-data-analyst-at-one-mount-group",
          title: 'I finished my 969-day journey as Data Analyst at One Mount Group.',
          description: "",
          section: "News",},{id: "news-i-was-awarded-the-vingroup-science-and-technology-scholarship-for-master-39-s-study",
          title: 'I was awarded the Vingroup Science and Technology Scholarship for Master&amp;#39;s study.',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024_07_06_vingroup_scholarship/";
            },},{id: "news-i-ve-officially-started-my-master-s-study-in-data-science-at-nanyang-technological-university",
          title: 'I’ve officially started my Master’s study in Data Science at Nanyang Technological University....',
          description: "",
          section: "News",},{id: "news-i-ve-just-started-my-internship-at-continental-ntu-corporate-lab-working-under-the-ai-for-software-engineering-team",
          title: 'I’ve just started my internship at Continental-NTU Corporate Lab, working under the AI...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Socials',
        handler: () => {
          window.open("https://facebook.com/giangson.me", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/giangson19# your GitHub user name", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nguyengiangson", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.giangson.me/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
