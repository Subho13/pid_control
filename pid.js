class PID {
    constructor(kp, ki, kd, ll, lu) {
        this.Kp = kp;
        this.Ki = ki;
        this.Kd = kd;
        this.lim_l = ll;
        this.lim_u = lu;
    }

    init(current, target) {
        this.target = target;
        this.output = current;

        this.int_err = 0;
        this.last_err = 0;
        this.time = Date.now();
    }

    updateTarget(target) {
        this.target = target;
    }

    pid_loop() {
        const error = this.target - this.output;

        const delta_p = this.Kp * error;

        this.int_err += error;
        const delta_i = this.Ki * this.int_err;

        const del_err = error - this.last_err;
        const delta_d = this.Kd * del_err;

        this.output += delta_p + delta_i + delta_d;

        if (this.output < this.lim_l) this.output = this.lim_l;
        else if (this.output > this.lim_u) this.output = this.lim_u;

        return this.output;
    }
}