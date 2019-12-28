import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import Redirect from 'umi/redirect';

export default class GlobalHeaderRight extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {currentUser} = nextProps;
    const {username} = currentUser;

    this.setState({
      username: username
    })
  }

  render() {
    const {
      onMenuClick,
      theme,
    } = this.props;

    const {username} = this.state;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>


        {username !== 'nouser' ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>

              <span className={styles.name}>{username}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Redirect to='/user'/>
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}
