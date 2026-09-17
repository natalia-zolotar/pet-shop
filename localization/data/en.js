export default {
  backToHome: 'Back to Home',
  backToMenu: 'Back to Menu',
  nav: {
    menu: 'Menu',
    howItWorks: 'How it works',
    contacts: 'Contact Us',
    orders: 'My Orders'
  },
  menu: {
    shoppingCartIconAlt: 'Shopping cart icon',
    title: 'Menu',
    btn: {
      buy: 'Buy'
    }
  },
  manageProducts: {
    title: 'Menu Categories & Products',
    noCategoryText: 'No categories yet',
    btn: {
      addCategory: 'Add New Category',
      editCategory: 'Edit',
      removeCategory: 'Delete',
      moveCategoryPrev: 'Move Up',
      moveCategoryNext: 'Move Down',

      openContent: 'Expand',
      closeContent: 'Collapse',

      addProduct: 'Add Product',
      editProduct: 'Edit',
      removeProduct: 'Remove',
      moveProductPrev: 'Move Prev',
      moveProductNext: 'Move Next'
    }
  },
  categoryForm: {
    titleAdd: 'Add Category',
    titleEdit: 'Edit Category',
    btn: {
      saveNewCategory: 'Save Category',
      saveChangedCategory: 'Save Changes',
      cancel: 'Cancel'
    },
    missingFieldsMessage: 'At least one field must be filled in',
    duplicatedFieldsMessage: 'This name already exists',
    categoryAddedMessage: 'Category added successfully',
    categoryChangedMessage: 'Category has been updated successfully',
    categoryRemovedMessage: 'Category deleted successfully'
  },
  productForm: {
    titleAdd: 'Set Product Details',
    titleEdit: 'Edit Product Details',
    labels: {
      price: 'Price',
      title: 'Title',
      desc: 'Description'
    },
    btn: {
      saveNewProduct: 'Save Product',
      saveChangedProduct: 'Save Changes',
      cancel: 'Cancel',
      chooseImage: 'Choose Image'
    },
    missingPriceMessage: 'Please enter the product price',
    missingTitleFieldsMessage: 'At least one Title field must be filled in',
    duplicatedFieldsMessage: 'This product name already exists',
    productAddedMessage: 'Product added successfully',
    productUpdatedMessage: 'Product has been updated successfully',
    productRemovedMessage: 'Product deleted successfully'
  },
  confirmAction: {
    title: 'Are you sure?',
    yes: 'Yes',
    no: 'No',
    categoryNotEmpty: 'You cannot delete this category while it contains products',
    close: 'Close'
  },
  homePage: {
    title: 'Delicious food,',
    subtitle: 'delivered to you',
    text: 'Order your favorite dishes from our restaurant and enjoy fast delivery at your door.',
    link1: 'View Menu',
    link2: 'Track Order',
    features: [
      {
        extraClass: 'fast-delivery',
        title: 'Fast Delivery',
        caption: '30-45 min',
      },
      {
        extraClass: 'fresh-hot',
        title: 'Fresh & Hot',
        caption: 'Quality food',
      },
      {
        extraClass: 'safe-packaging',
        title: 'Safe Packaging',
        caption: 'Secure & hygienic',
      }
    ]
  },
  howItWorksPage: {
    title: 'How it works',
    text: [
      'Order your favorite meals online directly from our restaurant.',
      'Our chefs prepare every dish using fresh, high-quality ingredients.',
      'We carefully pack your order, and our courier delivers it straight to your address.'
    ]
  },
  contactUsPage: {
    title: 'Contact Us',
    text: [
      '<b>MealGo</b> is a restaurant serving Ukrainian and European cuisine in Poland. Every day, we prepare our guests’ favorite dishes using fresh ingredients while focusing on great taste, friendly service, and a comfortable dining experience.',
      'Our menu features traditional Ukrainian dishes, popular European favorites, appetizers, salads, main courses, and desserts. We pay special attention to the quality of our ingredients, careful preparation, and the taste and presentation of every dish.',
      'You can visit our restaurant, order food to take away, or choose delivery. We want to make the entire ordering process simple and convenient — from selecting your favorite dishes to receiving your completed order.',
      '<b>Address:</b> 100 Marszałkowska Street, Warsaw, Poland',
      '<b>Email:</b> <a href="mailto:fake@fake.com">fake@fake.com</a>',
      '<b>Customer Support:</b> +111 111 111',
      '<h2>Our Restaurant</h2>',
      'We are happy to welcome guests to our restaurant in Warsaw. Whether you are looking for a place to enjoy a meal, meet friends or family, or simply spend some time in a comfortable atmosphere, our team is ready to welcome you.',
      'If you prefer to order food for takeaway or delivery, simply choose your favorite dishes from our menu and place your order online. Our team will carefully prepare your order and make sure it is ready on time.',
      'If you have any questions about our menu, orders, delivery, pickup, or would like to leave feedback, please contact our customer support team. We are always happy to assist and make your MealGo experience as convenient as possible.'
    ]
  },
  checkout: {
    cartTitle: 'Your Cart',
    total: 'Total',
    emptyCart: 'Your cart is empty',
    orderAdded: 'Your order has been placed',
    btn: {
      clearCart: 'Clear Cart',
      removeItem: 'Remove',
      placeOrder: 'Place Order'
    }
  },
  delivery: {
    title: 'Delivery Information',
    invalidPhoneNumber: 'Please enter a valid phone number',
    label: {
      name: 'Name',
      namePlaceholder: 'Enter your name',
      phone: 'Phone',
      address: 'Address',
      addressPlaceholder: 'Street, house number, apartment',
      note: 'Note',
      notePlaceholder: 'Additional instructions for your order'
    }
  },
  orders: {
    title: 'My Orders',
    order: 'Order',
    status: 'Status',
    orderItems: 'Order items',
    emptyOrder: 'You have no orders yet',
    btn: {
      viewOrder: 'View Order',
      removeOrder: 'Remove Order'
    },
    statusLabel: {
      new: 'Order Received',
      cooking: 'Preparing',
      packaging: 'Packaging',
      delivering: 'Out for Delivery',
      completed: 'Completed'
    }
  },
  error404: {
    title: 'Page Not Found',
    text: 'The page you are looking for may have been moved, deleted, or never existed.'
  },
  login: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    createAccount: 'Create account',
    loginAccount: 'Already have an account? Login',
    invalidEmail: 'Please enter a valid email',
    invalidPassword: 'Password must be at least 6 characters',
    label: {
      email: 'Email',
      name: 'Name',
      password: 'Password'
    }
  }
}