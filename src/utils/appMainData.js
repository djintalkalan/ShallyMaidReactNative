// import GlobalStyle from './styles'
import { Images } from './images'

export const AppMainData = [
  {
    id: 1,
    title: "Home Maids",
    desc: "Floor|Kitchen|Flat",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "Flat",
        parentId: 1
      },
      {
        childId: 2,
        childName: "One BHK",
        parentId: 1
      },
      {
        childId: 3,
        childName: "Two BHK",
        parentId: 1
      },
      {
        childId: 4,
        childName: "Three BHK",
        parentId: 1
      },
      {
        childId: 5,
        childName: "Other",
        parentId: 1
      }
    ]
  },
  {
    id: 2,
    title: "Cook",
    desc: "Familly|PG|Restaurent",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "For Family",
        parentId: 2
      },
      {
        childId: 2,
        childName: "For PG",
        parentId: 2
      },
      {
        childId: 3,
        childName: "For Restaurent",
        parentId: 2
      },
      {
        childId: 4,
        childName: "Other",
        parentId: 2
      }
    ]
  },
  {
    id: 3,
    title: "Beauty, Mehndi, Makeup",
    desc: "Wax|Facial|Hair",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "Wax",
        parentId: 3
      },
      {
        childId: 2,
        childName: "Mehndi",
        parentId: 3
      },
      {
        childId: 3,
        childName: "Makeup",
        parentId: 3
      },
      {
        childId: 4,
        childName: "Other",
        parentId: 3
      }
    ]
  },
  {
    id: 4,
    title: "Electrician, Plumber, Carpenter",
    desc: "Repair|Installation",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "Electrician",
        parentId: 4
      },
      {
        childId: 2,
        childName: "Plumber",
        parentId: 4
      },
      {
        childId: 3,
        childName: "Carpenter",
        parentId: 4
      },
      {
        childId: 4,
        childName: "Other",
        parentId: 4
      }
    ]
  },
  {
    id: 5,
    title: "Pantry Boy",
    desc: "Office|Kitchen|Mess",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "Office",
        parentId: 5
      },
      {
        childId: 2,
        childName: "Party Halls",
        parentId: 5
      },
      {
        childId: 3,
        childName: "Mess",
        parentId: 5
      },
      {
        childId: 4,
        childName: "Other",
        parentId: 5
      }
    ]
  },
  {
    id: 6,
    title: "Gardner",
    desc: "Garden|Daily|SingleDay",
    img: Images.maid,
    child: [
      {
        childId: 1,
        childName: "Home",
        parentId: 5
      },
      {
        childId: 2,
        childName: "Office",
        parentId: 5
      },
      {
        childId: 3,
        childName: "School",
        parentId: 5
      },
      {
        childId: 4,
        childName: "Other",
        parentId: 5
      }
    ]
  },
]



