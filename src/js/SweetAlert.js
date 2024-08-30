
const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
  })
const mostrarAlerta=async(icon,title)=>{
    await Toast.fire({
        icon: icon,
        title: title,
      })
}
export {mostrarAlerta}