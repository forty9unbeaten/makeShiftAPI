export const getProductResponse = {
    products: [
        {
            productId: 10101,
            productName: "3D printed eye wear",
            productDescription: "An alloy designed to fix eye glasses.",
            productImgs: [
              "https://3dprintingindustry.com/wp-content/uploads/2018/11/2nns4p.gif"
            ],
            productCategory: "Eye-wear",
            ratingsCount: 3,
        ratings: [
                5.0, 5.0, 5.0
            ]
          },

          {
            productId: 10102,
            productName: "3d printing LAMP SHADE Pendant",
            productDescription: "Stylish and functional lamp shade design to fit any modern home.",
            productImgs: [
                "https://i.etsystatic.com/18775715/r/il/5b739a/1712109327/il_1588xN.1712109327_3iz4.jpg"
                
            ],
            productCategory: "Houshold Products",
            ratingsCount: 3,
            ratings: [
                4.8, 4.1, 5.0
            ]
          },

          {
            productId: 10103,
            productName: "3d Printing Mug // Coffee 3D Printing Wine Repeat // Gift for 3d Printing Nerd",
            productDescription: "Office Products, Household Products",
            productImgs: [
              "https://i.etsystatic.com/17452301/r/il/3c52c7/2006565470/il_1588xN.2006565470_klxt.jpg"
            ],
            productCategory: "Office Products, Household Products",
            ratingsCount: 3,
            ratings: [
                5.0, 5.0, 4.8
            ]
          }
    ],
    statusCode: 200
}

export const postProductResponse = {
    product: {
      productId: 10104,
      productName: "V6 High Performance Brass 3d Printing Nozzle .8mm",
      productDescription: ".8mm Brass Nozzle - For High Volume Extrusion",
      productCategory: "Automotive Products",
      ratingsCount: 3,
      ratings: [
        5.0, 5.0, 5.0
      ]
    },
    statusCode: 200
  }

  export const getProductId = {
    product: {
      productId: 10105,
      productName: "V6 High Performance Brass 3d Printing Nozzle .6m",
      productDescription: ".6mm V6 Brass Nozzle - For High Volume Extrusion",
      productImgs: [
        "https://i.etsystatic.com/19775861/r/il/b2f7f9/1859685951/il_1588xN.1859685951_gilx.jpg"
      ],
      productCategory: "Automotiv Products",
      ratingsCount: 3,
      ratings: [
        5.0, 5.0, 5.0
      ]
    },
    statusCode: 200
  }

  export const patchProductId = {
    product: {
      productId: 10105,
      productName: "V6 High Performance Brass 3d Printing Nozzle .6",
      productDescription: ".6mm V6 Brass Nozzle - For High Volume Extrusion",
      productImgs: [
        "https://i.etsystatic.com/19775861/r/il/b2f7f9/1859685951/il_570xN.1859685951_gilx.jpg"
      ],
      ratingsCount: 3,
      ratings: [
        5.0, 5.0, 5.0
      ]
    },
    statusCode: 200
  }

  export const deleteProductId = {
    productName: "V6 High Performance Brass 3d Printing Nozzle .8mm",
    statusCode: 200
  }