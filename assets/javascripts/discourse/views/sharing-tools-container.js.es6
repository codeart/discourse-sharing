import SharingToolComponent from '../components/sharing-tool';

export default Ember.ContainerView.extend({
  classNameBindings: ['hidden', ':sharing-tools'],

  hidden: function() {
    return !this.get('post.firstPost');
  }.property(),

  init: function() {
    this._super();
    if (this.get('hidden')) return;

    this.pushObject(this.createChildView(SharingToolComponent, {topic: this.get('topic')}));
  }
});
