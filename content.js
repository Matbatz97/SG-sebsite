// ═══════════════════════════════════════════════════════════════
//  StudioGraphic — Content File
//  Edit this file to update your website. No need to touch HTML.
// ═══════════════════════════════════════════════════════════════

const SG = {

  // ── Business Info ────────────────────────────────────────────
  // Update phone/email/address here and it changes everywhere.
  business: {
    phone:        '07423578862',
    phoneDisplay: '07423 578 862',
    email:        'info@studiographic.co.uk',
    address:      'Unit 2 Tyne Street Business Park, CA1 2GY',
    whatsapp:     '447423578862',
    instagram:    'https://www.instagram.com/studiographic__',
    facebook:     'https://www.facebook.com/Studio.graphic.carlisle/',
  },

  // ── Hero Stats ───────────────────────────────────────────────
  // The numbers that count up on the home page.
  stats: [
    { count: 1000, suffix: '+', label: 'Projects Completed' },
    { count: 11,   suffix: '+', label: 'Years Experience'   },
  ],

  // ── Gallery ──────────────────────────────────────────────────
  // To add a photo: drop the file in the Projects/ folder,
  // then add a new entry below following the same format.
  // To remove a photo: delete its entry.
  // Order here = order on the website.
  gallery: [
    { src: 'Projects/IMG_5853.jpeg',       alt: 'Vehicle Wrap',                   label: 'Racing Livery'                   },
    { src: 'Projects/IMG_5248.jpeg',       alt: 'Signage',                        label: 'Partial Vehicle Wrap'            },
    { src: 'Projects/FullSizeRender.jpeg', alt: 'Shopfront Signage',              label: 'Illuminated Sign-Tray'           },
    { src: 'Projects/IMG_4617.jpeg',       alt: 'Race Car Wrap',                  label: 'Sign Tray With Stand-Off Letters'},
    { src: 'Projects/IMG_6350.jpeg',       alt: 'Van Wrap',                       label: 'Sign-Writing'                    },
    { src: 'Projects/IMG_5482.jpeg',       alt: 'Built-Up Signage',               label: 'Sign-Tray With Stand-Off Logo'   },
    { src: 'Projects/IMG_4256.jpeg',                              alt: 'Digitally Printed Partial Wrap', label: 'Digitally Printed Partial Wrap'  },
    { src: 'Projects/IMG_2665.jpeg',                              alt: 'Full Cab Wrap',                  label: 'Full Digitally Printed Cab Wrap' },
    { src: 'Projects/IMG_0355.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics'                },
    { src: 'Projects/IMG_1739.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap'                        },
    { src: 'Projects/IMG_2110.jpeg',                              alt: 'Signage',                        label: 'Signage'                         },
    { src: 'Projects/IMG_2344.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics'                },
    { src: 'Projects/IMG_2666.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap'                        },
    { src: 'Projects/IMG_2884.jpeg',                              alt: 'Signage',                        label: 'Signage'                         },
    { src: 'Projects/IMG_3792.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
    { src: 'Projects/IMG_5808.jpeg',                              alt: 'Van Graphics',                   label: 'Van Graphics'                    },
    { src: 'Projects/IMG_4688.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
    { src: 'Projects/IMG_4873.jpeg',                              alt: 'Signage',                        label: 'Signage'                         },
    { src: 'Projects/IMG_5314.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap'                        },
    { src: 'Projects/IMG_5626.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics'                },
    { src: 'Projects/IMG_8822.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap'                        },
    { src: 'Projects/IMG_9022.jpeg',                              alt: 'Signage',                        label: 'Signage'                         },
    { src: 'Projects/IMG_9116.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
    { src: 'Projects/IMG_9186.jpeg',                              alt: 'Van Graphics',                   label: 'Van Graphics'                    },
    { src: 'Projects/IMG_9943.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics'                },
    { src: 'Projects/76341E43-05DC-4536-942B-DC5FED30DCCE.jpeg', alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
    { src: 'Projects/A2E49490-ED17-4D8E-8BA1-F550917D73AA.jpeg', alt: 'Van Graphics',                   label: 'Van Graphics'                    },
    { src: 'Projects/IMG_0737.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics'                },
    { src: 'Projects/IMG_1212.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap'                        },
    { src: 'Projects/IMG_4567.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
    { src: 'Projects/IMG_5709.jpeg',                              alt: 'Signage',                        label: 'Signage'                         },
    { src: 'Projects/76d003f6-3b3d-4e86-abd5-42b55d09e6b1.JPG', alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap'                    },
  ],

  // ── Testimonials ─────────────────────────────────────────────
  // To add a review: copy one block and fill in the details.
  // initials: first letters of first + last name (shown in avatar).
  // company: leave as '' if no company.
  testimonials: [
    {
      text:     "Done the graphics on our vans and a pleasure to deal with and very professional. Has just done the design and full wrap on our rally car and it looks absolutely 👌👌 the amount of people that comment on it looking fantastic. Couldn't recommend them enough.",
      name:     'Andrew Otto',
      initials: 'AO',
      company:  '',
    },
    {
      text:     "Been great dealing with Matty at Studio Graphic. He was very quick to respond and get some visuals sent over. Squeezed me in so I had minimal down time. High quality job and I'll definitely be recommending him to others and going back for future work.",
      name:     'Adam Crellin',
      initials: 'AC',
      company:  '',
    },
    {
      text:     "Studio Graphics is the place to go if you want top quality designs and customer service. Matty messaged me back and within the same day I had a design sent over — he nailed it. So quick and top notch workmanship. I wouldn't go anywhere else. Thank you very much Matty.",
      name:     'Lee Heaney',
      initials: 'LH',
      company:  '',
    },
    {
      text:     "Absolutely fantastic job carried out by Matty at Studio Graphic on our Carlisle branch. True professional and exceeded our expectations. Highly recommended.",
      name:     'Adam M',
      initials: 'AM',
      company:  'FleetWise Solutions Ltd',
    },
  ],
};
