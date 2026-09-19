// ═══════════════════════════════════════════════════════════════
//  StudioGraphic — Content File
//  Edit this file to update your website. No need to touch HTML.
// ═══════════════════════════════════════════════════════════════

const SG = {

  // ── Business Info ────────────────────────────────────────────
  // Update phone/email/address here and it changes everywhere.
  business: {
    phone:        '01228472486',
    phoneDisplay: '01228 472486',
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
    { src: 'Projects/IMG_8118.jpeg',       alt: 'Be-Cool Air Conditioning & Refrigeration Carlisle Ltd geometric blue van wrap by StudioGraphic', label: 'Be-Cool Air Conditioning Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_8089.jpeg',       alt: 'All Clear Window Cleaning Cumbria Ltd custom Ford Transit van wrap by StudioGraphic', label: 'All Clear Window Cleaning Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7655.jpeg',       alt: 'Radio Taxis Carlisle exterior building signage and promotional fascia boards by StudioGraphic', label: 'Radio Taxis Carlisle Signage', category: 'signage' },
    { src: 'Projects/IMG_8158.jpeg',       alt: 'Stratus Electrical Group printed pull-up roller banners and exhibition displays by StudioGraphic', label: 'Stratus Electrical Roller Banners', category: 'signage' },
    { src: 'Projects/IMG_7840.jpeg',       alt: 'RG Civil Engineering and Surveying Ltd grey van graphics and rear chevrons by StudioGraphic', label: 'RG Civil Engineering Van Wrap', category: 'vehicle' },
    { src: 'Projects/PHOTO-2026-03-16-16-14-22.jpg', alt: 'Advanced Scaffolding printed advertising banner on scaffolding by StudioGraphic', label: 'Advanced Scaffolding Banner', category: 'signage' },
    { src: 'Projects/IMG_7874.jpeg',       alt: 'Limitless Fitness Combat & Fitness custom red and black taxi van wrap by StudioGraphic', label: 'Limitless Fitness Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7739.jpeg',       alt: 'OBT Van Sales custom Union Jack bonnet wrap and door graphics by StudioGraphic', label: 'OBT Van Sales Truck Graphics', category: 'vehicle' },
    { src: 'Projects/IMG_7737.jpeg',       alt: 'Sooty n\' Sweepz chimney sweeping and stove fitting services printed van wrap by StudioGraphic', label: 'Sooty n\' Sweepz Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7581.jpeg',       alt: 'Dream Clean Exterior Property Care printed vehicle wrap by StudioGraphic', label: 'Dream Clean Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7443.jpeg',       alt: 'Barbie x Rightmove custom pink Volkswagen truck wrap by StudioGraphic', label: 'Barbie x Rightmove Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7082.jpeg',       alt: 'Ty Bell Welding & Steel Fabrications Volkswagen van wrap by StudioGraphic', label: 'Ty Bell Welding Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7170.jpeg',       alt: 'Irthing Vale Quality Foods Mercedes van wrap by StudioGraphic', label: 'Irthing Vale Quality Foods Van Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_7238.jpeg',       alt: 'Jackson\'s DAF recovery truck graphics and branding by StudioGraphic', label: 'Jackson\'s Recovery Truck Graphics', category: 'vehicle' },
    { src: 'Projects/IMG_7239.jpeg',       alt: 'Jackson\'s DAF recovery truck rear chevron graphics by StudioGraphic', label: 'Jackson\'s Recovery Truck Chevron Graphics', category: 'vehicle' },
    { src: 'Projects/IMG_6914.jpeg',       alt: 'Precision Men\'s Hair 3D raised interior gloss black signage by StudioGraphic', label: 'Precision Men\'s Hair 3D Signage', category: 'signage'        },
    { src: 'Projects/IMG_6999.jpeg',       alt: 'Primrose Cleaning Company printed van wrap by StudioGraphic', label: 'Primrose Cleaning Van Wrap', category: 'vehicle'           },
    { src: 'Projects/IMG_5853.jpeg',       alt: 'Vehicle Wrap',                   label: 'Racing Livery', category: 'vehicle'                   },
    { src: 'Projects/IMG_5248.jpeg',       alt: 'Signage',                        label: 'Partial Vehicle Wrap', category: 'vehicle'            },
    { src: 'Projects/FullSizeRender.jpeg', alt: 'Shopfront Signage',              label: 'Illuminated Sign-Tray', category: 'signage'           },
    { src: 'Projects/IMG_4617.jpeg',       alt: 'Race Car Wrap',                  label: 'Sign Tray With Stand-Off Letters', category: 'signage' },
    { src: 'Projects/IMG_6350.jpeg',       alt: 'Van Wrap',                       label: 'Sign-Writing', category: 'vehicle'                    },
    { src: 'Projects/IMG_5482.jpeg',       alt: 'Built-Up Signage',               label: 'Sign-Tray With Stand-Off Logo', category: 'signage'   },
    { src: 'Projects/IMG_4256.jpeg',                              alt: 'Digitally Printed Partial Wrap', label: 'Digitally Printed Partial Wrap', category: 'vehicle'  },
    { src: 'Projects/IMG_2665.jpeg',                              alt: 'Full Cab Wrap',                  label: 'Full Digitally Printed Cab Wrap', category: 'vehicle' },
    { src: 'Projects/IMG_0355.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics', category: 'vehicle'                },
    { src: 'Projects/IMG_1739.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap', category: 'vehicle'                        },
    { src: 'Projects/IMG_2110.jpeg',                              alt: 'Signage',                        label: 'Signage', category: 'signage'                         },
    { src: 'Projects/IMG_2344.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics', category: 'vehicle'                },
    { src: 'Projects/IMG_2666.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap', category: 'vehicle'                        },
    { src: 'Projects/IMG_2884.jpeg',                              alt: 'Signage',                        label: 'Signage', category: 'signage'                         },
    { src: 'Projects/IMG_3792.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
    { src: 'Projects/IMG_5808.jpeg',                              alt: 'Van Graphics',                   label: 'Van Graphics', category: 'vehicle'                    },
    { src: 'Projects/IMG_4688.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
    { src: 'Projects/IMG_4873.jpeg',                              alt: 'Signage',                        label: 'Signage', category: 'signage'                         },
    { src: 'Projects/IMG_5314.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap', category: 'vehicle'                        },
    { src: 'Projects/IMG_5626.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics', category: 'vehicle'                },
    { src: 'Projects/IMG_8822.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap', category: 'vehicle'                        },
    { src: 'Projects/IMG_9022.jpeg',                              alt: 'Signage',                        label: 'Signage', category: 'signage'                         },
    { src: 'Projects/IMG_9116.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
    { src: 'Projects/IMG_9186.jpeg',                              alt: 'Van Graphics',                   label: 'Van Graphics', category: 'vehicle'                    },
    { src: 'Projects/IMG_9943.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics', category: 'vehicle'                },
    { src: 'Projects/76341E43-05DC-4536-942B-DC5FED30DCCE.jpeg', alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
    { src: 'Projects/A2E49490-ED17-4D8E-8BA1-F550917D73AA.jpeg', alt: 'Van Graphics',                   label: 'Van Graphics', category: 'vehicle'                    },
    { src: 'Projects/IMG_0737.jpeg',                              alt: 'Vehicle Graphics',               label: 'Vehicle Graphics', category: 'vehicle'                },
    { src: 'Projects/IMG_1212.jpeg',                              alt: 'Van Wrap',                       label: 'Van Wrap', category: 'vehicle'                        },
    { src: 'Projects/IMG_4567.jpeg',                              alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
    { src: 'Projects/IMG_5709.jpeg',                              alt: 'Signage',                        label: 'Signage', category: 'signage'                         },
    { src: 'Projects/76d003f6-3b3d-4e86-abd5-42b55d09e6b1.JPG', alt: 'Vehicle Wrap',                   label: 'Vehicle Wrap', category: 'vehicle'                    },
  ],

  // ── Testimonials ─────────────────────────────────────────────
  // To add a review: copy one block and fill in the details.
  // initials: first letters of first + last name (shown in avatar).
  // company: leave as '' if no company.
  testimonials: [
    {
      text:     "Quality job every time from Studio Graphic, I wouldn't take my vans anywhere else!",
      name:     'Stephen',
      initials: 'S',
      company:  '',
      date:     '3 weeks ago',
    },
    {
      text:     "Had my van sign written by Matty, very quick turnaround and quality finish highly recommend",
      name:     "Luke D'arcy",
      initials: 'LD',
      company:  '',
      date:     '1 month ago',
    },
    {
      text:     "Used matty multiple times for graphics on cars, outstanding quality and attention to detail as always!",
      name:     'James',
      initials: 'J',
      company:  '',
      date:     '2 months ago',
    },
    {
      text:     "Matty was outstanding from start to finish. Everything was done in a quick and efficient manner and nothing was too much trouble. The design exceeded our expectations and have already started to received enquiries through it. Thank you again Matty and keep up the good work!",
      name:     'Rebecca Cervi',
      initials: 'RC',
      company:  'Primrose Cleaning Company Ltd',
      date:     '3 months ago',
    },
    {
      text:     "Emailed them late at night with what I needed was ready to collect next morning and looks great can’t thank them enough",
      name:     'Sargeant',
      initials: 'S',
      company:  '',
      date:     '3 months ago',
    },
    {
      text:     "Been great dealing with Matty at Studio Graphic. He was very quick to respond and get some visuals sent over. Squeezed me in so I had minimal down time. High quality job and I'll definitely be recommending him to others and going back for future work.",
      name:     'Adam Crellin',
      initials: 'AC',
      company:  '',
      date:     '5 months ago',
    },
    {
      text:     "Done the graphics on our vans and a pleasure to deal with and very professional. Has just done the design and full wrap on our rally car and it looks absolutely 👌👌 the amount of people that comment on it looking fantastic. Couldn't recommend them enough.",
      name:     'Andrew Otto',
      initials: 'AO',
      company:  '',
      date:     '6 months ago',
    },
    {
      text:     "Highly recommend StudioGraphic, Matty's communication from start to finish was amazing, from design to completion of my van. Definitely exceeded all expectations and very competitively priced.",
      name:     'Grant Barnes',
      initials: 'GB',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "Wouldn’t go anywhere else for sign-writing etc now. Matty had designed, supplied and fitted the vinyl to my van for my business. He was very quick to respond and squeezed me in on short notice. Great communication skills and the end result looking great too! Very fairly priced.",
      name:     'Connor Pagan',
      initials: 'CP',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "Purchased a newish van for my business, Studio Graphics were recommended to me for the livery. I would highly recommend him, his attention to detail and customer service is nothing but exceptional! I will go back to them again.",
      name:     'Border Plumbing Services',
      initials: 'BP',
      company:  'Border Plumbing Services Ltd',
      date:     'Recent Review',
    },
    {
      text:     "Studio Graphics is the place to go if you want top quality designs and customer service. Matty messaged me back and within the same day I had a design sent over — he nailed it. So quick and top notch workmanship. I wouldn't go anywhere else.",
      name:     'Lee Heaney',
      initials: 'LH',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "Matt talked us through the options and messaged with further info. Fantastic service and excellent quality! You will be in safe professional hands here!",
      name:     'High Tech Air',
      initials: 'HT',
      company:  'High Tech Air Conditioning',
      date:     'Recent Review',
    },
    {
      text:     "Brilliant service, done all our signage with a fast turnaround! Very fair priced, wouldn't use any other company!",
      name:     'Jamie Combe',
      initials: 'JC',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "What a wonderful experience. Matt was very helpful and knew exactly what I was looking for. Car was done when he said it would be. He even gave me a run home to save me getting a taxi. Most definitely worth a visit. Top work",
      name:     'Andrew Robson',
      initials: 'AR',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "1st class service from Matty. From 1st port of call till last the service was outstanding. The final product the 'van' looks brilliant.",
      name:     'Warren Rooney',
      initials: 'WR',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "Completed sign writing for my van, very pleased with the work. Friendly and professional. Highly recommend for any graphic work.",
      name:     'Jamie M',
      initials: 'JM',
      company:  '',
      date:     'Recent Review',
    },
    {
      text:     "Outstanding service, won't look anywhere else for my graphics work",
      name:     'OTB Automotive',
      initials: 'OA',
      company:  'OTB Automotive',
      date:     'Recent Review',
    },
    {
      text:     "Absolutely fantastic job carried out by Matty at Studio Graphic on our Carlisle branch. True professional and exceeded our expectations. Highly recommended.",
      name:     'Adam M',
      initials: 'AM',
      company:  'FleetWise Solutions Ltd',
      date:     'Verified Review',
    },
    {
      text:     "Very professional, easy to talk to and quick turn around. I provided my logo and StudioGraphic done the rest. Cracking work, highly recommend! 👍",
      name:     'Joshua Story',
      initials: 'JS',
      company:  '',
      date:     'Verified Review',
    },
    {
      text:     "StudioGraphic did a fantastic job on my work van, great communication from start to finish. Highly recommend 👌",
      name:     'Chloe Bland',
      initials: 'CB',
      company:  '',
      date:     'Verified Review',
    },
  ],
};
