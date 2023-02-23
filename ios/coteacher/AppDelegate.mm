#import "AppDelegate.h"

#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"coteacher";
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application
  openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  // kakao
  if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
  }

  // naver
  if ([url.scheme isEqualToString:@"coteacher"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }

  return YES;
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
