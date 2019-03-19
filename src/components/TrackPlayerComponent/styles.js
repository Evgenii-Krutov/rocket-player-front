export const styles = theme => ({
  footerAppBar: {
    top: 'auto',
    bottom: 0,
    width: "85%",
    backgroundColor: "#eeeeee",
  },
  footerToolBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songLine: {
    position: "fixed",
    top: 'auto',
    bottom: 0,
    left: 240,
    height: 64,
    backgroundColor: "#f44336",
    zIndex: 1000,
    opacity: 0.3,
    transition: "width 1s",
  },
  trackImage: {
    marginLeft: 10,
    marginRight: 20,
    opacity: 1,
    zIndex: 1000,
  },
  trackDuration: {
    position: 'fixed',
    right: 270,
    zIndex: 1000,
  },
  trackButtons: {
    position: 'fixed',
    right: 60,
    zIndex: 1000,
  },
});