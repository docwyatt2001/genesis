import Ember from 'ember';
import cardColor from '../../../../utils/card-color';


export default Ember.Controller.extend({
  breadCrumb: {name: 'New user', icon: 'user'},
  cardColor: function() {
    return cardColor();
  }.property(),
  fields: {
    username: {
      rules: [
        {
          type: 'empty'
        },
        {
          type: 'regExp[/^[a-z0-9]{2,30}$/]',
          prompt: '{name} must be lowercase letters or numbers, and less than 30 characters'
        }
      ]
    },
    firstName: {
      rules: [
        {
          type: 'regExp[/^[a-zA-Z][a-zA-Z0-9_-]*$/]'
        },
        {
          type: 'empty'
        }
      ]
    },
    password: {
      rules: [
        {
          type: 'minLength[6]'
        },
        {
          type: 'empty'
        }
      ]
    },
    passwordConf: {
      rules: [
        {
          type: 'match[password]'
        }
      ]
    }
  },
  actions: {
    save: function() {
      var self = this;
      var user = this.store.createRecord('user', {
        name: this.get('name'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        admin: this.get('admin') || false,
        sudo: this.get('sudo') || false,
        domain: this.get('domain') || this.get('domains.firstObject'),
        passwd: this.get('passwd')
      });
      var promise = user.save();
      promise.then(function() {
        self.setProperties({
          name: '', firstName: '', lastName: '', admin: false, sudo: false,
          domain: self.get('domains.firstObject'), passwd: '', passwdb: ''
        });
        self.transitionToRoute("settings.roles.users");
      }, function(e){
        if (e.status === 500) {
          self.transitionToRoute("error", e);
        } else if (e.errors) {
          e.errors.forEach(function(err) {
            self.notifications.new('error', err.detail);
          });
        }
        user.deleteRecord();
      });
    },
    redirect: function() {
      this.setProperties({
        name: '', firstName: '', lastName: '', admin: false, sudo: false,
        domain: this.get('domains.firstObject'), passwd: '', passwdb: ''
      });
      this.transitionToRoute('settings.roles.users');
    }
  }
});
