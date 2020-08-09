import React, { PureComponent } from 'react';

import { Menu, DropDown } from 'antd';


import {GlobalOutlined} from '@ant-design/icons';

import intl from 'react-intl-universal';

import http from "axios";



require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');



const SUPPOER_LOCALES = [
    {
      name: "English",
      value: "en-US"
    },
    {
      name: "简体中文",
      value: "zh-CN"
    }
  ];

export default class SelectLang extends PureComponent {

    // state = { initDone: false };
    componentDidMount() {
        this.loadLocales();
      }

    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang"
        });
        if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = "zh-CN";
        }

        http
        .get(`locales/${currentLocale}.json`)
        .then(res => {
            console.log("App locale data", res.data);
            // init method will load CLDR locale data according to currentLocale
            return intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: res.data
                }
            });
        })
        .then(() => {
            // After loading CLDR locale data, start to render
            // this.setState({ initDone: true });
        });
    }
    changeLang = ({ key }) => {
        location.search = `?lang=${key}}`;
    };
    render() {
        // const { className } = this.props;
        // const selectedLang = getLocale();
        // const locales = ['zh-CN', 'en-US' ];
        // const languageLabels = {
        //   'zh-CN': '简体中文',
        //   'en-US': 'English'
        // };
        const langMenu = (
          <Menu onClick={this.changeLang}>

            {SUPPOER_LOCALES.map(locale => (
                <Menu.Item key={locale.value}>{locale.name}</Menu.Item>
            ))}
        
          </Menu>
        );
        return (
          <DropDown overlay={langMenu} placement="bottomRight">
            <span className={classNames(styles.dropDown, className)}>
                <GlobalOutlined />
              {/* <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} /> */}
            </span>
          </DropDown>
        );
      }
    }