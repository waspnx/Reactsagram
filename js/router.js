import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import{
  PhotoModel,
  PhotoCollection
} from './resources';

import{
  DetailsComponent,
  HeaderComponent,
  HomeComponent,
  UploadComponent,
  EditComponent
} from './views';

export default Backbone.Router.extend({

    routes: {
    ''             : "redirectToHome",
    "home"         : "homeView",
    "home/:id"     : "getDetails",
    "upload"       : "upload",
    "edit/:id"     : "edit"
  },

        initialize(appElement) {

            this.el = appElement;
            this.collection = new PhotoCollection();

        },

        goto(route) {
          this.navigate(route, {
            trigger: true
          });
        },

        render(component){
          ReactDom.render(component, this.el);
        },

        redirectToHome() {
          this.navigate('home',{
            replace: true,
            trigger: true
          })
        },

    homeView(){
    this.collection.fetch().then(() =>{
    this.render(
      <wrap>
      <HeaderComponent
      onUploadClick={()=>this.goto('upload')}
      onHomeClick={()=>this.goto('home')}/>
      <HomeComponent
      onPhotoSelect ={(id) => 
      this.goto(`home/${id}`,{trigger: true})}
      photos={this.collection.toJSON()}/>
      </wrap>
      );
    });
  },

    getDetails(id){
    this.render(
      <wrap>
        <HeaderComponent
        onUploadClick={()=>this.goto('upload')}
        onHomeClick={()=>this.goto('home')}/>
        <DetailsComponent
        onEditClick={(id)=>this.goto(`edit/${id}`,{trigger: true})}/>
      </wrap>
      )
    },

    upload(){
      this.render(
        <wrap>
          <HeaderComponent
          onUploadClick={()=>this.goto('upload')}
          onHomeClick={()=>this.goto('home')}/>
          <UploadComponent/>
        </wrap>
        )
    },

    edit(id){
      this.render(
      <wrap>
       <HeaderComponent
        onUploadClick={()=>this.goto('upload')}
        onHomeClick={()=>this.goto('home')}/>
       <EditComponent/>
      </wrap>
      )
    },

    start() {
        Backbone.history.start();
        return this;
      },

});



