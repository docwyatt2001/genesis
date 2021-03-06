import Ember from 'ember';
import handleModelError from '../../../utils/handle-model-error';


export default Ember.Controller.extend({
  breadCrumb: Ember.computed("model.id", {
    get() {
      return {name: this.get("model.id"), icon: 'disk outline'};
    }
  }),
  actions: {
    mount: function(fs) {
      var self = this;
      fs.set('operation', 'mount');
      fs.set('isReady', false);
      var promise = fs.save();
      promise.then(function(){}, function(e){
        handleModelError(self, e);
      });
    },
    umount: function(fs){
      var self = this;
      fs.set('operation', 'umount');
      fs.set('isReady', false);
      var promise = fs.save();
      promise.then(function(){}, function(e){
        handleModelError(self, e);
      });
    },
    enable: function(fs) {
      var self = this;
      fs.set('operation', 'enable');
      fs.set('isReady', false);
      var promise = fs.save();
      promise.then(function(){}, function(e){
        handleModelError(self, e);
      });
    },
    disable: function(fs) {
      var self = this;
      fs.set('operation', 'disable');
      fs.set('isReady', false);
      var promise = fs.save();
      promise.then(function(){}, function(e){
        handleModelError(self, e);
      });
    },
    openModal: function(name) {
      Ember.$('.ui.' + name + '.modal').modal('show');
    },
    mountEnc: function() {
      var fs = this.get('model');
      var self = this;
      fs.set('operation', 'mount');
      fs.set('passwd', this.get('passwd'));
      fs.set('isReady', false);
      this.set('passwd', undefined);
      var promise = fs.save();
      promise.then(function(){}, function(e){
        handleModelError(self, e);
      });
    },
    deleteFs: function() {
      var fs = this.get('model');
      var self = this;
      Ember.$('.ui.delete-fs.modal').modal('hide', function() {
        fs.destroyRecord().then(function(){}, function(){
          fs.rollback();
        });
        self.transitionToRoute('tools.filesystems');
      });
    },
    clearModal: function() {
      this.transitionToRoute('tools.filesystems');
    }
  }
});
