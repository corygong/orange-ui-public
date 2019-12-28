import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';

@connect()
class SearchList extends Component {
  handleTabChange = key => {

    //console.log(this.props);
    const { match } = this.props;
    switch (key) {
      case 'adr':
        router.push(`${match.url}/adr`);
        break;
      case 'vacancy':
        router.push(`${match.url}/vacancy`);
        break;
      case 'info':
        router.push(`${match.url}/info`);
        break;
      case 'zone':
        router.push(`${match.url}/zone`);
        break;
      case 'brand':
        router.push(`${match.url}/brand`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line

  };

  render() {
    const tabList = [
      {
        key: 'adr',
        tab: <FormattedMessage id="menu.list.searchlist.adr" defaultMessage="酒店ADR" />,
      },
      {
        key: 'vacancy',
        tab: <FormattedMessage id="menu.list.searchlist.vacancy" defaultMessage="酒店空置率" />,
      },
      {
        key:'info',
        tab:<FormattedMessage id="menu.list.searchlist.info" defaultMessage="酒店信息库" />,
      },
      {
        key:'zone',
        tab:<FormattedMessage id="menu.list.searchlist.zone" defaultMessage="商圈分析" />,
      },
      {
        key: 'brand',
        tab: <FormattedMessage id="menu.list.searchlist.brand" defaultMessage="品牌分析" />,
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, children, location } = this.props;

    return (
      <PageHeaderWrapper
        title=""
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
        {/* <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch> */}
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
