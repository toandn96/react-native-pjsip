//
//  PjSipConference.h
//  Pods
//
//  Created by Andre on 09/06/23.
//
#import <React/RCTUtils.h>

#import <VialerPJSIP/pjsua.h>

#import "PjSipCall.h"

@interface PjSipConference : NSObject

@property int id;
@property NSMutableDictionary* calls;


+(instancetype)instance;

-(void)addCall:(PjSipCall*) call;
-(void)start;