export class Loading {
  loading: boolean;

  constructor() {
    this.loading = false;
  }
  startLoading() {
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
  }
  getLoading() {
    return this.loading;
  }
}

export const clickLoading = new Loading();
