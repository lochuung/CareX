export const sidebarProfileLinks = [
    {
        label: 'Edit Profile',
        route: '/editprofile',
        imgUrl: '/Icons/edit.png'
    },
    {
        label: 'Notifications',
        route: '/notifications',
        imgUrl: '/Icons/notification.png'
    },
    {
        label: 'Choose Plan',
        route: '/chooseplan',
        imgUrl: '/Icons/chooseplan.png'
    },
    {
        label: 'Password & Security',
        route: '/password-security',
        imgUrl: '/Icons/security.png'
    }
]
export const inputProfile = [
    {
        label: 'Fast Name',
        value:'{formik.values.fastname}',
        type: 'text',
        name: 'fastname',
        placeholder: 'Your fast name',
        touched: 'formik.touched.fastname',
        errors: 'formik.errors.fastname'
    },
    {
        label: 'Last Name',
        value:'{formik.values.lastname}',
        type: 'text',
        name: 'lastname',
        placeholder: 'Your last name',
        touched: 'formik.touched.lastname',
        errors: 'formik.errors.lastname'
    },
    {
        label: 'Email',
        value:'{formik.values.email}',
        type: 'email',
        name: 'email',
        placeholder: 'Your email',
        touched: 'formik.touched.email',
        errors: 'formik.errors.email'
    },
    {
        label: 'Contacts Number',
        value:'{formik.values.number}',
        type: 'text',
        name: 'number',
        placeholder: 'How can we contact you ?',
        touched: 'formik.touched.number',
        errors: 'formik.errors.number'
    },
    {
        label: 'Address',
        value:'{formik.values.address}',
        type: 'text',
        name: 'address',
        placeholder: 'Where do you live?',
        touched: 'formik.touched.address',
        errors: 'formik.errors.address'
    },
    {
        label: 'City',
        value:'{formik.values.city}',
        type: 'text',
        name: 'city',
        placeholder: 'Ex: Amsterdam,....',
        touched: 'formik.touched.city',
        errors: 'formik.errors.city'
    },
    {
        label: 'State',
        value:'{formik.values.state}',
        type: 'text',
        name: 'state',
        placeholder: 'Ex: New York,....',
        touched: 'formik.touched.state',
        errors: 'formik.errors.state'
    },
    {
        label: 'Zip code',
        value:'{formik.values.zipcode}',
        type: 'text',
        name: 'zipcode',
        placeholder: 'Ex: 11357,....',
        touched: 'formik.touched.zipcode',
        errors: 'formik.errors.zipcode'
    },
    {
        label: 'Country',
        value:'{formik.values.country}',
        type: 'text',
        name: 'country',
        placeholder: 'Ex: United States,....',
        touched: 'formik.touched.country',
        errors: 'formik.errors.country'
    },
    {
        label: 'Password',
        value:'{formik.values.password}',
        type: 'password',
        name: 'password',
        placeholder: '********',
        touched: 'formik.touched.password',
        errors: 'formik.errors.password'
    },
]