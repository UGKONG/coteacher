#import "AppDelegate.h"

//#import <Firebase.h>
//#import <FirebaseCore.h>
//#import <FirebaseMessaging.h>

//#import <RNKakaoLogins.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"coteacher";
  self.initialProps = @{};

//  if ([FIRApp defaultApp] == nil) {
//    [FIRApp configure];
//  }
  

//  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter]; // 추가

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
