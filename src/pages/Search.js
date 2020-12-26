import React, { useState } from 'react';
import {Layout ,Breadcrumb} from 'antd'

import {FileSearchOutlined, BarChartOutlined} from '@ant-design/icons';

import styles  from './Search.module.css';
import extend from 'lodash/extend'

import 'searchkit/release/theme.css'


import {
    SearchBox,
    RefinementListFilter,
    Hits,
    NoHits,
    HitsStats,
    SearchkitComponent,
    SelectedFilters,
    MenuFilter,
    ViewSwitcherHits,
    HierarchicalMenuFilter,
    Pagination,
    ResetFilters,
    SearchkitManager,
    SearchkitProvider,
    Layout as SearchLayout,
    LayoutBody,
    SideBar,
    LayoutResults,
    ActionBar,
    ActionBarRow,
    ViewSwitcherToggle,
    SortingSelector,
    GroupedSelectedFilters,
    AxiosESTransport
    
    } from "searchkit";

import { get, post } from '../utils/request';

import {Link} from 'react-router-dom';



const {Content} = Layout;
export default function Search(props) {




    const host = "http://localhost:3000/api/search"
    const searchkit = new SearchkitManager(host)

    searchkit.transport =  new AxiosESTransport(host, {
        headers: {
            "content-type": "application/json",
            "Authorization": "JWT " + localStorage.getItem('currentJWT'),
        }
    })



    const HitsListItem = (props)=> {

        console.log(props)
        const {bemBlocks, result} = props
        let url = "/statistics/" + result._source.stat_name
        const source = extend({}, result._source, result.highlight)
        return (
          <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
            {/* <div className={bemBlocks.item("poster")}>
              <img alt="presentation" data-qa="poster" src={result._source.poster}/>
            </div>
            <div className={bemBlocks.item("details")}>
              <a href={url} target="_blank"><h2 className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}></h2></a>
              <h3 className={bemBlocks.item("subtitle")}>Released in {source.year}, rated {source.imdbRating}/10</h3>
              <div className={bemBlocks.item("text")} dangerouslySetInnerHTML={{__html:source.plot}}></div>
            </div> */}
    
            <div>
    
                
                <Link to={url} target='_blank'>
    
                {/* <a href={url} target="_blank"> */}
                    
                    {/* <Icon type="bar-chart" className={styles.iconStyle}/> */}


                    <BarChartOutlined className={styles.iconStyle}/>
                    
                    
                    <div className={styles.itemStyle}>
                        <h2 className={styles.titleStyle}>{source.chart_title}</h2>
                        <h3 className={styles.subTitleStyle}> {source.chart_desc}</h3>
                    </div>
                    
                </Link>
                
            </div>
    
          </div>
        )
      }


    return (

        <Content style={{ padding:'0 50px' }}>

<SearchkitProvider searchkit={searchkit}>
                <SearchLayout>

            <div style={{ textAlign: 'center' }}>
                {/* <Input.Search
                    placeholder="发现统计和数据"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.handleFormSubmit}
                    style={{ width: 522 }}
                /> */}
                <SearchBox 
                    autofocus={true} 
                    searchOnChange={true} 
                    prefixQueryFields={["chart_title^1","chart_desc^2"]}
                    placeholder= "Search For Statistics..."
                />


            </div>

            <LayoutBody>
                <SideBar>

                </SideBar>
                <LayoutResults>
                    <ActionBar>

                        <ActionBarRow>

                            <HitsStats translations={{
                                "hitstats.results_found": "{hitCount} results found"
                            }}/>

                            <ViewSwitcherToggle/>
                            <SortingSelector options={[
                                {label: "Relevance", field:"_score", order:"desc"},
                                {label: "Date Of Publication", field: "update_ts", order: "desc"}
                            ]}/>
                        </ActionBarRow>

                        <ActionBarRow>
                            <GroupedSelectedFilters/>
                            <ResetFilters/>

                        </ActionBarRow>


                    </ActionBar>
                    {/* <ViewSwitcherHits
                        hitsPerPage={10} highlightFields={["chart_title"]}
                        sourceFilter={[ "chart_title", "chart_desc", "data_source" ]}
                        hitComponents={[
                        // {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},
                        {key:"list", title:"List", itemComponent:MovieHitsListItem, defaultOption:true}
                        ]}
                        scrollTo="body"
                    /> */}
                    <Hits
                        hitsPerPage={10}
                        highlightFields={["title","plot"]}
                        sourceFilter={["chart_title", "chart_desc", "data_source", "stat_name"]}
                        itemComponent={HitsListItem} 
                        mod="sk-hits-list"
                        scrollTo="body"
                    />
                    <NoHits suggestionsField={"chart_title"}/>
                    <Pagination showNumbers={true}/>

                </LayoutResults>
            </LayoutBody>
            </SearchLayout>
            </SearchkitProvider>
 

        </Content>
    )
}
