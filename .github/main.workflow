workflow "Build & Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "test"
}

workflow "Build & Test - PR" {
  on = "pull_request"
  resolves = ["Test"]
}
