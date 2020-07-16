<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users List</h3>
                    <!-- button for new user modal -->
                    <div class="card-tools">
                        <button class="btn btn-success" @click="newModal">
                            <span>Add New</span>&nbsp;<i class="fas fa-user-plus" aria-hidden></i>
                        </button>
                    </div>
                </div>

                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registered At</th>
                                <th>Status</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "user in users" :key = "user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name | capitalize }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.created_at | dateFormat }}</td>
                                <td>
                                    <i class="fas fa-check-circle fa-lg green" aria-hidden></i>
                                </td>
                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fas fa-edit blue" aria-hidden></i>
                                    </a>&nbsp;
                                    <a href="#" @click="deleteUser(user.id)">
                                        <i class="fas fa-trash red" aria-hidden></i>
                                    </a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
    </div>

    <!-- modal for add new item -->
    <!-- Modal -->
    <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editmode" id="addNewModalLabel">New User</h5>
                    <h5 class="modal-title" v-show="editmode" id="addNewModalLabel">Update User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <!-- user create form with vue -->
                        <!-- name -->
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <!-- email -->
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <!-- password -->
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" placeholder="Password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                        <button v-show="!editmode" type="submit" class="btn btn-success">Create</button>
                    </div>
                </form>
                <!-- form close -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            //edit mode
            editmode: false,
            // empty user object
            users: {},
            // Create a new form instance
            form: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                email_verified_at: ''
            })
        }
    },
    methods: {
        // create item modal
        newModal() {
            this.editmode = false;
            this.form.reset();
            this.form.clear();
            $('#addNew').modal('show');
        },
        // edit item modal
        editModal(user) {
            this.editmode = true;
            this.form.reset();
            this.form.clear();
            $('#addNew').modal('show');
            this.form.fill(user);
        },
        // list items
        listUsers() {
            axios.get('api/user')
            .then(({data}) => (this.users = data.data));
        },
        // create item
        createUser() {
            //  start the progress bar
            this.$Progress.start();
            //  create user
            this.form.post('api/user')
            // using promise to check success
            .then(() => {
                // fire event
                Fire.$emit('successReload');
                // hide modal
                $('#addNew').modal('hide');
                // fire swal with toaster
                toast.fire({
                    icon: 'success',
                    title: 'User Created Successfully!'
                });

            })
            // error throw
            .catch(() => {
                toast.fire(
                    'failed!',
                    'Something wrong!',
                    'warning'
                )
            });
            //  finish the progress bar
            this.$Progress.finish();

        },
        // update item
        updateUser() {
            //  start the progress bar
            this.$Progress.start();
            //  update user
            this.form.put('api/user/'+this.form.id)
            // using promise to check success
            .then(() => {
                // fire event
                Fire.$emit('successReload');
                // hide modal
                $('#addNew').modal('hide');
                // fire swal with toaster
                toast.fire({
                    icon: 'success',
                    title: 'User Updated Successfully!'
                });

            })
            // error throw
            .catch(() => {
                toast.fire(
                    'failed!',
                    'Something wrong!',
                    'warning'
                )
            });
            //  finish the progress bar
            this.$Progress.finish();

        },
        // delete item
        deleteUser(id) {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                // after confirmation
                if (result.value) {
                    this.form.delete('api/user/'+id)
                    // success
                    .then(() => {
                        toast.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        )
                        Fire.$emit('successReload');
                    })
                    // failure
                    .catch(() => {
                        toast.fire(
                            'Failed!',
                            'Something wrong!',
                            'warning'
                        )
                    });
                }
            });
        }
    },
    mounted() {
        this.listUsers();
        Fire.$on('successReload', () => {
            this.listUsers();
        });
        // setInterval(() => this.listUsers(), 3000);
    }
}
</script>
