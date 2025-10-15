

class Cookie {


    constructor() {
        const script = document.createElement('script'); 
        script.src = './cdncookie.js';  
        // script.src = ' https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';  
        script.async = true;                             
        document.body.appendChild(script);  
        
        setTimeout(() => {
           this.createCookie();
        }, 50);
    }

    createCookie() {
        /**
         * All config. options available here:
         * https://cookieconsent.orestbida.com/reference/configuration-reference.html
         */

        CookieConsent.run({
            categories: {
                necessary: {
                    enabled: true,  // this category is enabled by default
                    readOnly: true  // this category cannot be disabled
                },
                analytics: {}
            },

            guiOptions: {
                consentModal: {
                    layout: 'cloud',
                    position: 'bottom center',
                    flipButtons: false,
                    equalWeightButtons: true
                },
                preferencesModal: {
                    layout: 'box',
                    // position: 'left right',
                    flipButtons: false,
                    equalWeightButtons: true
                }
            },

            language: {
                default: 'th',
                translations: {
                    'en': {
                        consentModal: {
                            title: "Cookies are used on this site",
                            description: "To provide you a better experience on our services. If you use our website as is with no changes to your settings. We recognize that by using our website, you consent to receiving cookies. <a href='https://corporate.wacoal.co.th/privacy/policy_en.pdf' target='_blank'>Read More</a>",
                            acceptAllBtn: "Accept All",
                            acceptNecessaryBtn: "Reject All",
                            showPreferencesBtn: "Manage Preferences"
                        },
                        preferencesModal: {
                            title: "Manage Cookie Preferences",
                            acceptAllBtn: "Accept All",
                            acceptNecessaryBtn: "Reject All",
                            savePreferencesBtn: 'Accept Current Selection',
                            closeIconLabel: "Close",
                            sections: [
                                {
                                    title: "Privacy Policy",
                                    description: "To provide you a better experience on our services. If you use our website as is with no changes to your settings. We recognize that by using our website, you consent to receiving cookies. <a href='https://corporate.wacoal.co.th/privacy/policy_en.pdf' target='_blank'>Read More</a>"
                                },
                                {
                                    title: "Strictly Necessary Cookies",
                                    description: "Necessary cookies are required to help a website usable by enabling core functions and access to secure areas of the website. The website cannot be function properly without these cookies and they are enabled by default and cannot be disabled.",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Performance and Analytics Cookies",
                                    description: "Analytics cookies help website to understand how visitors interact through the website. These cookies help to improve user experiences by collecting and reporting information.",
                                    linkedCategory: "analytics",
                                    cookieTable: {
                                        headers: {
                                            name: "Name",
                                            domain: "Service",
                                            description: "Description",
                                            expiration: "Expiration"
                                        },
                                        body: [
                                            {
                                                name: "_ga",
                                                domain: "Google Analytics",
                                                description: "Cookie set by Google Analytics",
                                                expiration: "12 months"
                                            },
                                            {
                                                name: "_gid",
                                                domain: "Google Analytics",
                                                description: "Cookie set by Google Analytics",
                                                expiration: "Session"
                                            },
                                            {
                                                name: "AEC",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "6 months"
                                            },
                                            {
                                                name: "IDE",
                                                domain: "doubleclick.net",
                                                description: "Cookie set by doubleclick.net",
                                                expiration: "1 month"
                                            },
                                            {
                                                name: "DV",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "1 day"
                                            },
                                            {
                                                name: "NID",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "6 months"
                                            },
                                            {
                                                name: "VISITOR_INFO1_LIVE",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "6 months"
                                            },
                                            {
                                                name: "VISITOR_PRIVACY_METADATA",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "6 months"
                                            },
                                            {
                                                name: "YSC",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "Session"
                                            }
                                        ]
                                    }
                                },
                                // {
                                //     title: "More information",
                                //     description: "For any queries in relation to our policy on cookies and your choices, please <a class=\"cc-link\" href=\"#yourdomain.com\">contact us</a>."
                                // }
                            ]
                        }
                    },
                    'th': {
                        consentModal: {
                            title: "เว็บไซต์นี้มีการใช้งานคุ้กกี้",
                            description: "เราให้ความสำคัญต่อข้อมูลส่วนบุคคลของท่าน หากท่านใช้บริการเว็บไซต์นี้โดยไม่มีการปรับตั้งค่าใดๆ แสดงว่าท่านยินยอมที่จะรับคุกกี้บนเว็บไซต์ของเรา <a href='https://corporate.wacoal.co.th/privacy/policy_th.pdf' target='_blank'>อ่านเพิ่มเติม</a>",
                            acceptAllBtn: "ยอมรับทั้งหมด",
                            acceptNecessaryBtn: "ปฏิเสธทั้งหมด",
                            showPreferencesBtn: "การตั้งค่าคุ้กกี้"
                        },
                        preferencesModal: {
                            title: "การตั้งค่าความเป็นส่วนตัว",
                            acceptAllBtn: "ยอมรับทั้งหมด",
                            acceptNecessaryBtn: "ปฏิเสธทั้งหมด",
                            savePreferencesBtn: 'ยืนยันตัวเลือกของฉัน',
                            closeIconLabel: "ปิด",
                            sections: [
                                {
                                    title: "นโยบายความเป็นส่วนตัว",
                                    description: "เราให้ความสำคัญต่อข้อมูลส่วนบุคคลของท่าน หากท่านใช้บริการเว็บไซต์นี้โดยไม่มีการปรับตั้งค่าใดๆ แสดงว่าท่านยินยอมที่จะรับคุกกี้บนเว็บไซต์ของเรา <a href='https://corporate.wacoal.co.th/privacy/policy_th.pdf' target='_blank'>อ่านเพิ่มเติม</a>"
                                },
                                {
                                    title: "คุกกี้พื้นฐานที่จำเป็น",
                                    description: "คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม และจะใช้งานได้โดยการตั้งค่าเริ่มต้น โดยไม่สามารถปิดการใช้งานได้",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "คุกกี้ในส่วนวิเคราะห์",
                                    description: "คุกกี้ในส่วนวิเคราะห์ จะช่วยให้เว็บไซต์เข้าใจรูปแบบการใช้งานของผู้เข้าชมและจะช่วยปรับปรุงประสบการณ์การใช้งาน โดยการเก็บรวบรวมข้อมูลและรายงานผลการใช้งานของผู้ใช้งาน",
                                    linkedCategory: "analytics",
                                    cookieTable: {
                                        headers: {
                                            name: "Name",
                                            domain: "Service",
                                            description: "Description",
                                            expiration: "Expiration"
                                        },
                                        body: [
                                            {
                                                name: "_ga",
                                                domain: "Google Analytics",
                                                description: "Cookie set by Google Analytics",
                                                expiration: "12 เดือน"
                                            },
                                            {
                                                name: "_gid",
                                                domain: "Google Analytics",
                                                description: "Cookie set by Google Analytics",
                                                expiration: "Session"
                                            },
                                            {
                                                name: "AEC",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "6 เดือน"
                                            },
                                            {
                                                name: "IDE",
                                                domain: "doubleclick.net",
                                                description: "Cookie set by doubleclick.net",
                                                expiration: "1 เดือน"
                                            },
                                            {
                                                name: "DV",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "1 วัน"
                                            },
                                            {
                                                name: "NID",
                                                domain: "Google Map",
                                                description: "Cookie set by Google Map",
                                                expiration: "6 เดือน"
                                            },
                                            {
                                                name: "VISITOR_INFO1_LIVE",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "6 เดือน"
                                            },
                                            {
                                                name: "VISITOR_PRIVACY_METADATA",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "6 เดือน"
                                            },
                                            {
                                                name: "YSC",
                                                domain: "Youtube",
                                                description: "Cookie set by Youtube",
                                                expiration: "Session"
                                            }
                                        ]
                                    }
                                },
                                // {
                                //     title: "More information",
                                //     description: "For any queries in relation to our policy on cookies and your choices, please <a class=\"cc-link\" href=\"#yourdomain.com\">contact us</a>."
                                // }
                            ]
                        }
                    }
                }
            }
        });
    }

}



export default Cookie;

