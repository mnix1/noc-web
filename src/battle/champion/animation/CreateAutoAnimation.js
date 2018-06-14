import _ from 'lodash';
import Animation, {SKIP, STEP} from "./Animation";

export default class CreateAutoAnimation {
    constructor(animationObject, precision = 6) {
        this.animation = animationObject.animation;
        this.key = animationObject.key;
        this.precision = precision;
    }

    get timesLength() {
        return Animation.generateTimes(this.animation.duration, STEP * SKIP).length;
    }

    classString() {
        return `
        import Animation from "./Animation";
        import * as bones from "../ChampionHelper";
        
        export default class AutoXAnimation extends Animation {
            constructor(champion) {
                super(champion);
            }

            get key() {
                return '${this.key}';
            }
            
             get skip(){
                return ${SKIP};
            }


            get duration() {
                return ${_.round(this.animation.duration, this.precision)};
            }

            prepareRawTracks() {
                return [
                    ${this.tracksString()}
                ]
            }
        }`
    }

    tracksString() {
        return this.animation.tracks.map(track => {
            if (!_.includes(track.name, 'quaternion')) {
                return null;
            }
            const boneName = _.snakeCase(track.name.split('.')[0]).toUpperCase();
            let trackTimesString = undefined;
            if (track.times.length / SKIP !== this.timesLength) {
                const trackTimes = [];
                let i = 0;
                for (let time of track.times.values()) {
                    if (i % SKIP === 0) {
                        trackTimes.push(_.round(time, this.precision));
                    }
                    i++;
                }
                trackTimesString = `[${trackTimes.join(',')}]`;
            }
            const trackValues = [];
            let i = 0;
            for (let value of track.values.values()) {
                if (Math.floor(i / 4) % SKIP === 0) {
                    trackValues.push(_.round(value, this.precision));
                }
                i++;
            }
            return `this.createQuaternionTrack(bones.${boneName}_BONE, ${trackTimesString}, [${trackValues.join(',')}])`;
        }).filter(e => !_.isNil(e))
            .join(',');
    }

    log() {
        console.log(this.classString());
    }

}