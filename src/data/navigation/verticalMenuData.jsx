const verticalMenuData = () => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'Courses',
    icon: 'ri-book-line',
    children: [
      {
        label: 'CourseList',
        href: '/courses'
      },
      {
        label: 'Language',
        href: '/courses/languages'
      }
    ]
  },
  {
    label: 'User',
    href: '/user',
    icon: 'ri-user-3-fill'
  }
]

export default verticalMenuData
