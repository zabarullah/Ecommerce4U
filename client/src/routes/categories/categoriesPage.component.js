import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/layout.component'
import useCategoryHook from '../../hooks/useCategoryHook'

import accessoriesPic from '../../assets/bubibubi_cz-LJ3HkoE77uw-unsplash-min.jpg'
import watchesPic from '../../assets/saif71-com-VIKdvmGUhq8-unsplash-min.jpg'
import mensFootwearPic from '../../assets/martin-katler-Y4fKN-RlMV4-unsplash.jpg'
import womensFootwearPic from '../../assets/alex-quezada-qAyOt0aGsCo-unsplash-min.jpg'
import giftsPic from '../../assets/laura-chouette-hDwgQLt_4LY-unsplash-min.jpg'

const categoryImageMap = {
    accessories: accessoriesPic,
    watches: watchesPic,
    "men's-footwear": mensFootwearPic,
    "women's-footwear": womensFootwearPic,
    gifts: giftsPic,
    // Add more mappings as needed
  };

const CategoriesPage = () => {
    const { categories } = useCategoryHook();
    const navigate = useNavigate();

    

  return (
    <Layout title={'All Categories'}>
        <div className="container">
            <div className="row">
                <h1 className='m-2 text-center'>Categories</h1>
                {
                    categories.map((category) => (
                        <div className="card m-3" style={{ width: '18rem', height: '500px' }} key={category._id}>
                            <div style={{height: '80%'}}>
                            <img
                                src={categoryImageMap[category.slug]}
                                className="card-img-top img-fluid mt-3"
                                alt={category.name}
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                            <div className="card-body text-center h-20">
                                {/* <button>  */}
                                <button
                                    className="btn btn-primary ms-1"
                                    onClick={() => navigate('/', { state: { checkedCategories: [category._id] } })}
                                    >
                                    {category.name}
                                </button>

                            </div>
                            </div>
                      </div>
                    ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default CategoriesPage