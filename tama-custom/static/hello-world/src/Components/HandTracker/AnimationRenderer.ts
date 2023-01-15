import * as spine from '@esotericsoftware/spine-canvas';
// import * as AssetsFolder from "@../../assets"
import {Context} from "react";

export class AnimationRenderer {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    skeletonRenderer: spine.SkeletonRenderer;
    assetManager: spine.AssetManager;
    skeleton: spine.Skeleton;
    skeletonData: spine.SkeletonData;
    lastFrameTime: number;
    animationState: spine.AnimationState;
    animationStateData: spine.AnimationStateData;
    currentAnimationSkin: string = "default";
    defaultBodyParts = [
        "body",
        "tail",
        "arm_left",
        "arm_right",
        "leg_left",
        "leg_right",
        "shadow",
        "blush",
    ];
    animationFaces = {
        "default": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "eat_1": [
            "mouth_3",
            "left_eye_1",
            "right_eye_1",
        ],
        "eat_2": [
            "mouth_4",
            "left_eye_1",
            "right_eye_1"
        ],
        "happy": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "sad": [
            "mouth_2",
            "left_eye_1",
            "right_eye_1"
        ],
        "touch": [
            "mouth_1",
            "left_eye_2",
            "right_eye_2"
        ],
        "idle_1": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "idle_2": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "go_forward": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "go_backward": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "attack_1": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "attack_2": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "injured": [
            "mouth_2",
            "left_eye_2",
            "right_eye_2"
        ],
        "jump": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "jump_double": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "turn": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "sit": [
            "mouth_1",
            "left_eye_1",
            "right_eye_1"
        ],
        "winner": [
            "mouth_1",
            "left_eye_2",
            "right_eye_2"
        ]
    }

    customSkins: string[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.skeletonRenderer = new spine.SkeletonRenderer(this.canvasContext);
        this.skeletonRenderer.triangleRendering = true;
        this.assetManager = new spine.AssetManager("./assets/");
        this.assetManager.loadTextureAtlas("animation_block_1.atlas");
        this.assetManager.loadBinary("animation_block_1.skel");
        this.assetManager.loadJson("animation_block_1.json");
    }

    async init() {
        await this.assetManager.loadAll();
        let atlas = this.assetManager.require("animation_block_1.atlas");
        let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        let skeletonJson = new spine.SkeletonJson(atlasLoader);
        this.skeletonData = skeletonJson.readSkeletonData(this.assetManager.require("animation_block_1.json"));
        this.skeleton = new spine.Skeleton(this.skeletonData);
        this.skeleton.setToSetupPose();
        this.skeleton.updateWorldTransform();
        this.animationStateData = new spine.AnimationStateData(this.skeletonData);
        this.animationStateData.defaultMix = 0.2;
        this.animationStateData.setMix("eat_1", "eat_2", 0);
        this.animationState = new spine.AnimationState(this.animationStateData);
        this.setToSetup()
    }

    setToSetup() {
        this.skeleton.setToSetupPose();
        this.setDefaultSkins();
    }

    renderAnimation() {
        const now = Date.now() / 1000;
        const delta: number = now - this.lastFrameTime;
        this.lastFrameTime = now;
        if (!isNaN(delta)) {
            this.animationState.update(delta);
        }

        const currentTrack = this.animationState.getCurrent(0);
        if (currentTrack.isComplete()) {
            this.setDefaultSkins();
        } else if (currentTrack.animation.name !== this.currentAnimationSkin) {
            console.log(currentTrack.animation.name);
            this.setSkin(currentTrack.animation.name);
        }
        this.animationState.apply(this.skeleton);
    }

    render(x: number, y: number, width: number, height: number, reverseX: boolean = false) {
        const scaleX = width / this.skeletonData.width;
        const scaleY = height / this.skeletonData.height;
        this.skeleton.x = x;
        this.skeleton.y = y;
        this.skeleton.scaleX = reverseX ? -scaleX : scaleX;
        this.skeleton.scaleY = -scaleY;

        if (this.animationState.getCurrent(0)) {
            this.renderAnimation();
        }
        this.skeleton.updateWorldTransform();
        this.skeletonRenderer.draw(this.skeleton);
    }

    setSkinsFromArray(skins: Array<string>) {
        let newSkin = new spine.Skin("custom-skin");
        for (const skinName of skins) {
            if (skinName)
                newSkin.addSkin(this.skeletonData.findSkin(skinName));
        }
        this.skeleton.setSkin(newSkin);
        this.skeleton.setToSetupPose();
        this.skeleton.updateWorldTransform();
    }

    setSkin(skinName: string) {
        this.setSkinsFromArray([...this.defaultBodyParts, ...this.animationFaces[skinName], ...this.customSkins]);
        this.currentAnimationSkin = skinName;
    }

    setDefaultSkins(clearCustomSkins: boolean = false) {
        if (clearCustomSkins) {
            this.customSkins = [];
        }
        this.setSkin("default");
    }

    setCustomSkinsFromJson(skins: {
        hatImg: string,
        weaponImg: string,
        costumeImg: string
    }) {
        // ./hat/hat_4.1-01.png - choose everything from ./ and to -
        const customSkins = [skins.hatImg, skins.weaponImg, skins.costumeImg]
        this.customSkins = customSkins.map(skin => skin.split("/").slice(-1)[0].split("-", 1)[0].replace('.', '_'));
        this.setDefaultSkins();
    }

    addListenerWithCallback(callback: (entry: spine.TrackEntry) => void, animationName: string) {
        const completeListener = {
            complete: entry => {
                {
                    if (entry.animation.name == animationName) {
                        if (callback) {
                            callback(entry);
                        }
                        removeMyself();
                    }
                }
            }
        }
        const removeMyself = () => {
            this.animationState.removeListener(completeListener);
        }
        this.animationState.addListener(completeListener)
    }

    setEatAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "eat_1", false);
        this.animationState.addAnimation(0, "eat_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "eat_2");
    }

    addEatAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "eat_1", false);
        this.animationState.addAnimation(0, "eat_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "eat_2");
    }

    setHappyAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "happy", false);
        if (callback)
            this.addListenerWithCallback(callback, "happy");
    }

    addHappyAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "happy", false);
        if (callback)
            this.addListenerWithCallback(callback, "happy");
    }

    setSadAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "sad", false);
        if (callback)
            this.addListenerWithCallback(callback, "sad");
    }

    addSadAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "sad", false);
        if (callback)
            this.addListenerWithCallback(callback, "sad");
    }

    setTouchAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "touch", false);
        if (callback)
            this.addListenerWithCallback(callback, "touch");
    }

    addTouchAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "touch", false);
        if (callback)
            this.addListenerWithCallback(callback, "touch");
    }

    setIdle1Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "idle_1", false);
        if (callback)
            this.addListenerWithCallback(callback, "idle_1");
    }

    addIdle1Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "idle_1", false);
        if (callback)
            this.addListenerWithCallback(callback, "idle_1");
    }

    setIdle2Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "idle_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "idle_2");
    }

    addIdle2Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "idle_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "idle_2");
    }

    setGoForwardAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "go_forward", false);
        if (callback)
            this.addListenerWithCallback(callback, "go_forward");
    }

    addGoForwardAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "go_forward", false);
        if (callback)
            this.addListenerWithCallback(callback, "go_forward");
    }

    setGoBackwardAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "go_backward", false);
        if (callback)
            this.addListenerWithCallback(callback, "go_backward");
    }

    addGoBackwardAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "go_backward", false);
        if (callback)
            this.addListenerWithCallback(callback, "go_backward");
    }

    setAttack1Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "attack_1", false);
        if (callback)
            this.addListenerWithCallback(callback, "attack_1");
    }

    addAttack1Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "attack_1", false);
        if (callback)
            this.addListenerWithCallback(callback, "attack_1");
    }

    setAttack2Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "attack_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "attack_2");
    }

    addAttack2Animation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "attack_2", false);
        if (callback)
            this.addListenerWithCallback(callback, "attack_2");
    }

    setInjuredAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "injured", false);
        if (callback)
            this.addListenerWithCallback(callback, "injured");
    }

    addInjuredAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "injured", false);
        if (callback)
            this.addListenerWithCallback(callback, "injured");
    }

    setJumpAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "jump", false);
        if (callback)
            this.addListenerWithCallback(callback, "jump");
    }

    addJumpAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "jump", false);
        if (callback)
            this.addListenerWithCallback(callback, "jump");
    }

    setDoubleJumpAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "jump_double", false);
        if (callback)
            this.addListenerWithCallback(callback, "jump_double");
    }

    addDoubleJumpAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "jump_double", false);
        if (callback)
            this.addListenerWithCallback(callback, "jump_double");
    }

    setTurnAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "turn", false);
        if (callback)
            this.addListenerWithCallback(callback, "turn");
    }

    addTurnAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "turn", false);
        if (callback)
            this.addListenerWithCallback(callback, "turn");
    }

    setSitAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "sit", false);
        if (callback)
            this.addListenerWithCallback(callback, "sit");
    }

    addSitAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "sit", false);
        if (callback)
            this.addListenerWithCallback(callback, "sit");
    }

    setWinnerAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.setAnimation(0, "winner", false);
        if (callback)
            this.addListenerWithCallback(callback, "winner");
    }

    addWinnerAnimation(callback: (entry: spine.TrackEntry) => void) {
        this.animationState.addAnimation(0, "winner", false);
        if (callback)
            this.addListenerWithCallback(callback, "winner");
    }
}