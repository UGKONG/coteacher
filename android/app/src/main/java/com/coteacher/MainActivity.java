package com.coteacher;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;
import com.dooboolab.naverlogin.RNNaverLoginModule;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    RNNaverLoginModule.initialize(this);
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "coteacher";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      DefaultNewArchitectureEntryPoint.getFabricEnabled(),
      DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()
    );
  }
}
