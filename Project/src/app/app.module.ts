import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {CoursesIntercepter} from './courses-intercepter.service';
import {LoginModule} from './pages/login/login.module';
import {VideoCoursesModule} from './pages/video-courses-page/video-courses.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {LoadingComponent} from './core/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    VideoCoursesModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CoursesIntercepter,
    multi: true,
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
