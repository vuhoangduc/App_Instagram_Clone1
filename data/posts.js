import { USERS } from "./USERS";


export const POSTS =[
{
    imageUrl:{uri:'https://product.hstatic.net/1000026716/product/phantom_i3050_dd44c0d8911e45a2ab9f4642e9f58b05.jpg'},
    user : USERS[0].user,
    likes : 7870,
    caption: 'My Idol',
    profile_picture: USERS[0].image,
    Comment:[
        {
            user:'thong',
            Comment:'Ronaldo number one!!!!'
        },
        {
            user:'Speed',
            Comment:'Ronaldo or Messi'
        },
    ]
},
{
    imageUrl:{uri:'https://product.hstatic.net/1000026716/product/minion_i1650_white_fa1d53072f0f4c868e2e3e3f33fcf168.jpg'},
    user : USERS[1].user,
    likes : 7870,
    caption: 'My Idol',
    profile_picture: USERS[1].image,
    Comment:[
        {
            user:'thong',
            Comment:'Ronaldo number one!!!!'
        },
        {
            user:'Speed',
            Comment:'Ronaldo or Messi'
        },
    ]
}
    
]