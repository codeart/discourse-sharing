import showModal from 'discourse/lib/show-modal';

export default Ember.Component.extend({
  layoutName: 'components/sharing-tool',

  actions: {
    share: function(view, type) {
      const controller = Discourse.__container__.lookup('controller:interstitial');

      controller.
        set("model", this.get("topic")).
        set("model.share_kind", type);

      showModal('interstitial', { model: this.get("topic"), title: "interstitial.title" });
    }
  }
});
