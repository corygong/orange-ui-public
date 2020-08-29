import React, { PureComponent } from 'react';

import { Menu, Dropdown } from 'antd';


import {TranslationOutlined} from '@ant-design/icons';


import { useLocation } from 'react-router-dom';


import http from "axios";
import styles  from './SelectLang.module.css';



import {injectIntl} from 'react-intl';






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

class SelectLang extends PureComponent {

    // state = { initDone: false };
    componentDidMount() {
        this.loadLocales();
      }

    loadLocales() {

        require('../locales/zh-CN.json');
        // return import('../locales/zh-CN.json')
    }
    changeLang = ({ key }) => {
        switch (key) {
            // case 'English':
            //   return import('../locales/en-US.json');
            // default:
            //   return import('../locales/zh-CN.json');
          }

        
    };
    render() {
        const langMenu = (
          <Menu onClick={this.changeLang}>

            {SUPPOER_LOCALES.map(locale => (
                <Menu.Item key={locale.value}>{locale.name}</Menu.Item>
            ))}
        
          </Menu>
        );
        return (
          <Dropdown overlay={langMenu} placement="bottomRight">
            <span>
                <TranslationOutlined className={styles.iconstyle}/>
              {/* <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} /> */}
            </span>
          </Dropdown>
        );
    }
}


export default injectIntl(SelectLang);