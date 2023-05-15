import React from 'react'
import Layout from '../../components/layout/layout.component'

import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

import contactUs from '../../assets/contactus.jpeg'
import './contact.styles.css'

const Contact = () => {
  return (
    <Layout title={"Contact Us - Ecommerce 4 U"}>
      <div className="row contactus ">
        <div className="col-md-6">
          <img
            src={contactUs}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 ">
          <h1 className="bg-info p-2 text-white text-center contactus-title">CONTACT US</h1>
          <p className="text-justify mt-2">
            Have a query or need more information about a product? Feel free to call anytime from 9am - 9pm
          </p>
          <p className="mt-3">
            <BiMailSend /> : help@ecommerce4u.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0123 123123
          </p>
          <p className="mt-3">
            <BiSupport /> : 0800-0000-0000 (free call)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact